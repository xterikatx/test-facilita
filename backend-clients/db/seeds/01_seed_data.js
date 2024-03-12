// 01_seed_data.js
const hoaxer = require('hoaxer');

exports.seed = function (knex) {
    return knex('clients').del()
        .then(function () {
            return knex('clients').insert([
                {
                    name: hoaxer.name.findName(),
                    email: hoaxer.internet.email(),
                    phone: hoaxer.phone.phoneNumber(),
                    coordinate_x: hoaxer.address.latitude(),
                    coordinate_y: hoaxer.address.longitude()
                },
                {
                    name: hoaxer.name.findName(),
                    email: hoaxer.internet.email(),
                    phone: hoaxer.phone.phoneNumber(),
                    coordinate_x: hoaxer.address.latitude(),
                    coordinate_y: hoaxer.address.longitude()
                },
                {
                    name: hoaxer.name.findName(),
                    email: hoaxer.internet.email(),
                    phone: hoaxer.phone.phoneNumber(),
                    coordinate_x: hoaxer.address.latitude(),
                    coordinate_y: hoaxer.address.longitude()
                },
                {
                    name: hoaxer.name.findName(),
                    email: hoaxer.internet.email(),
                    phone: hoaxer.phone.phoneNumber(),
                    coordinate_x: hoaxer.address.latitude(),
                    coordinate_y: hoaxer.address.longitude()
                },
                {
                    name: hoaxer.name.findName(),
                    email: hoaxer.internet.email(),
                    phone: hoaxer.phone.phoneNumber(),
                    coordinate_x: hoaxer.address.latitude(),
                    coordinate_y: hoaxer.address.longitude()
                },
                {
                    name: hoaxer.name.findName(),
                    email: hoaxer.internet.email(),
                    phone: hoaxer.phone.phoneNumber(),
                    coordinate_x: hoaxer.address.latitude(),
                    coordinate_y: hoaxer.address.longitude()
                },
                {
                    name: hoaxer.name.findName(),
                    email: hoaxer.internet.email(),
                    phone: hoaxer.phone.phoneNumber(),
                    coordinate_x: hoaxer.address.latitude(),
                    coordinate_y: hoaxer.address.longitude()
                },
                {
                    name: hoaxer.name.findName(),
                    email: hoaxer.internet.email(),
                    phone: hoaxer.phone.phoneNumber(),
                    coordinate_x: hoaxer.address.latitude(),
                    coordinate_y: hoaxer.address.longitude()
                },
                {
                    name: hoaxer.name.findName(),
                    email: hoaxer.internet.email(),
                    phone: hoaxer.phone.phoneNumber(),
                    coordinate_x: hoaxer.address.latitude(),
                    coordinate_y: hoaxer.address.longitude()
                },
                {
                    name: hoaxer.name.findName(),
                    email: hoaxer.internet.email(),
                    phone: hoaxer.phone.phoneNumber(),
                    coordinate_x: hoaxer.address.latitude(),
                    coordinate_y: hoaxer.address.longitude()
                },
                
            ]);
        });
};
