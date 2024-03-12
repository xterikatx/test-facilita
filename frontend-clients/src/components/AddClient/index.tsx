import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Grid } from '@mui/material';
import api from '../../services/api';
import { Bounce, toast } from 'react-toastify';
import { QueryClient } from '@tanstack/react-query';

interface Props {
    reloadData: () => void
}

function ClientForm({ reloadData }: Props) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        coordinate_x: null,
        coordinate_y: null
    });

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setFormData({
                    ...formData,
                    // @ts-ignore
                    coordinate_x: position.coords.latitude,
                    // @ts-ignore
                    coordinate_y: position.coords.longitude
                });
            }, (error) => {
                console.error('Error getting location:', error);
            });
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            await api.post('/clients', formData);
            toast.success('cliente adicionado com sucesso', {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });

            setFormData({
                name: '',
                email: '',
                phone: '',
                // @ts-ignore
                coordinate_x: '',
                // @ts-ignore
                coordinate_y: ''
            });

            reloadData()
        } catch (error) {
            console.error('Error adding client:', error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>
                Novo cliente
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Nome"
                            name="name"
                            variant="outlined"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            variant="outlined"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Telefone"
                            name="phone"
                            variant="outlined"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Latitude"
                            name="coordinate_x"
                            variant="outlined"
                            value={formData.coordinate_x}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Longitude"
                            name="coordinate_y"
                            variant="outlined"
                            value={formData.coordinate_y}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" onClick={handleLocation}>
                            use minha localização
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary">
                            adicionar cliente
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}

export default ClientForm;
