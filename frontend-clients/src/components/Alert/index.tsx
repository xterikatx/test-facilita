import { GridCheckIcon } from '@mui/x-data-grid';
import { Alert as MUIAlert, AlertProps as MUIAlertProps, Snackbar, SnackbarProps } from '@mui/material';

interface Props {
    message: string,
    onClose: () => void
}

type AlertProps = Props & MUIAlertProps & SnackbarProps

export default function Alert({ message, severity, open, onClose }: AlertProps) {
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
            <MUIAlert icon={<GridCheckIcon fontSize="inherit" />} severity={severity}>
                {message}
            </MUIAlert>
        </Snackbar>

    );
}