import { Box, Button, FormControl, Grid, Input, InputLabel, Typography } from '@mui/material'
import api from '../../services/api';
import { useState } from 'react';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Modal from '../../components/Modal';
import { styles } from './styles';
import ClientForm from '../../components/AddClient';
import { formatDate } from '../../utils/formatDate';
import ListOrderVisit from '../../components/ListOrderVisit/ìndex';

function Home() {
    const [term, setTerm] = useState('');
    const [openForm, setOpenForm] = useState(false);
    const [openListOrderVisit, setOpenListOrderVisit] = useState(false);

    const handleOpenForm = () => setOpenForm(true);
    const handleCloseForm = () => setOpenForm(false);

    const handleOpenListOrderVisit = () => setOpenListOrderVisit(true)
    const handleCloseListOrderVisit = () => setOpenListOrderVisit(false)

    const { data: clients, isLoading, isError, isFetched } = useQuery({
        queryKey: ['clients', term],
        queryFn: async () => {
            try {
                const response = await api.get('/clients', { params: { term } });
                return response.data ?? [];
            } catch (error) {
                console.error("Error fetching clients:", error);
                throw new Error("Failed to fetch clients");
            }
        },
    });

    const queryClient = new QueryClient()

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Nome', width: 130 },
        { field: 'email', headerName: 'Email', width: 250 },
        {
            field: 'phone',
            headerName: 'Telefone',
            type: 'number',
            width: 130,
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'coordinate_x',
            headerName: 'Latitude',
            width: 130,
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'coordinate_y',
            headerName: 'Longitude',
            width: 130,
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'created_at',
            headerName: 'Criada em ',
            width: 130,
            renderCell: (params) => formatDate(params.value),
            align: 'center',
            headerAlign: 'center'
        },
    ];


    return (
        <div>

            <Typography variant="h3" >
                Gerenciamento de clientes - Facilita
            </Typography>

            <Grid container spacing={1} alignItems={'center'} mt={1}>
                <Grid item xs={6.7}>
                    <FormControl sx={{ width: 400 }} variant="filled">
                        <InputLabel htmlFor="term">Pesquisa por nome, email ou telefone</InputLabel>
                        <Input
                            id="term"
                            value={term}
                            onChange={(e) => {
                                setTerm(e.target.value)
                            }}
                        />
                    </FormControl>
                </Grid>
                <Grid item alignSelf={'end'} xs={2}>
                    <Button variant="contained" onClick={handleOpenForm}>Adicionar cliente</Button>
                </Grid>
                <Grid item alignSelf={'end'} xs={2}>
                    <Button variant="contained" onClick={handleOpenListOrderVisit}>Ordem de visitação</Button>
                </Grid>
            </Grid>

            <>
                {isFetched && !isError && (
                    <>
                        <DataGrid
                            style={styles.datagrid}
                            rows={clients}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 10 },
                                },
                            }}
                            pageSizeOptions={[5, 10]}
                            loading={isLoading}
                        />
                    </>
                )}
            </>

            <>
                <Modal
                    open={openForm}
                    onClose={handleCloseForm}
                >
                    <Box sx={styles.boxModal}>
                        <ClientForm reloadData={() => {
                            queryClient.invalidateQueries({ queryKey: ['clients'] })
                        }} />
                    </Box>
                </Modal>
            </>


            <>
                <Modal
                    open={openListOrderVisit}
                    onClose={handleCloseListOrderVisit}
                    sx={{ width: 600 }}
                >
                    <Box sx={styles.boxModalOrderVisit}>
                       <ListOrderVisit />
                    </Box>
                </Modal>
            </>
        </div>

    )
}

export default Home