import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import api from '../../services/api';
import { useQuery } from '@tanstack/react-query';
import { GridColDef } from '@mui/x-data-grid';
import { CircularProgress } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


export default function ListOrderVisit() {

    const { data: clients, isLoading, isError, isFetched } = useQuery({
        queryKey: ['optimize-route'],
        queryFn: async () => {
            try {
                const response = await api.get('/optimize-route');
                return response.data ?? [];
            } catch (error) {
                throw new Error("Failed to fetch clients");
            }
        },
    });

    const columns: GridColDef[] = [
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
    ];


    if (isLoading) {
        return (
            <CircularProgress color="inherit" />
        )
    }

    return (
        <div>

            {isFetched && !isError && (
                <>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Nome</StyledTableCell>
                                    <StyledTableCell align="right">Email</StyledTableCell>
                                    <StyledTableCell align="right">Telefone</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {clients.map((client: { id: React.Key | null | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; email: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; phone: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => (
                                    <StyledTableRow key={client?.id}>
                                        <StyledTableCell component="th" scope="row">
                                            {client?.name}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">{client?.email}</StyledTableCell>
                                        <StyledTableCell align="right">{client?.phone}</StyledTableCell>

                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            )}
        </div>
    )
}
