// index.js
const express = require('express');
const bodyParser = require('body-parser');
const knex = require('knex');
const dbConfig = require('./knexfile');
const cors = require('cors');

const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.json());

const db = knex(dbConfig.development);

app.post('/clients', (req, res) => {
    const { name, email, phone, coordinate_x, coordinate_y } = req.body;

    db('clients')
        .insert({ name, email, phone, coordinate_x, coordinate_y })
        .returning('*')
        .then(client => {
            console.log(client)
            res.status(201).json(client[0]);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: 'Failed to add client' });
        });
});

app.get('/clients', (req, res) => {
    const { term } = req.query;

    db('clients')
        .select('*')
        .modify(queryBuilder => {
            if (term) {
                queryBuilder.where(function () {
                    this.where('name', 'ilike', `%${term}%`)
                        .orWhere('email', 'ilike', `%${term}%`)
                        .orWhere('phone', 'ilike', `%${term}%`);
                });
            }
        })
        .then(clients => {
            res.json(clients);
        })
        .catch(err => {
            res.status(500).json({ error: 'Failed to fetch clients' });
        });
});

function chebyshevDistance(point1, point2) {
    return Math.max(Math.abs(point1.coordinate_x - point2.coordinate_x), Math.abs(point1.coordinate_y - point2.coordinate_y));
}

function findNearestPoint(origin, points) {
    let minDistance = Infinity;
    let nearestPoint = null;

    for (const point of points) {
        const distance = chebyshevDistance(origin, point);
        if (distance < minDistance) {
            minDistance = distance;
            nearestPoint = point;
        }
    }
    return nearestPoint;
}

app.get('/optimize-route', async (req, res) => {
    try {
        const clients = await db('clients').select('*');

        const companyPoint = { coordinate_x: 0, coordinate_y: 0 };
        const points = [companyPoint, ...clients];

        let route = [0];
        let unvisitedPoints = points.slice(1);

        while (unvisitedPoints.length > 0) {
            const lastVisitedPoint = points[route[route.length - 1]];
            const nearestPoint = findNearestPoint(lastVisitedPoint, unvisitedPoints);
            const nearestPointIndex = points.indexOf(nearestPoint);
            route.push(nearestPointIndex);
            unvisitedPoints = unvisitedPoints.filter(point => point !== nearestPoint);
        }

        const clientsWithBestOptimize = route.map(index => {
            const clientId = points[index].id;
            return clients.find(client => client.id === clientId);
        }).slice(1);
        
        res.json(clientsWithBestOptimize);
    } catch (error) {
        console.error('Error fetching clients:', error);
        res.status(500).json({ error: 'Failed to fetch clients' });
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
