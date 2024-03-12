import { Modal as MUIModal, ModalProps } from "@mui/material"
import { ReactElement } from "react"

interface Props {
    open: boolean,
    onClose: () => void,
    children: ReactElement<any, any>
}

export default function Modal({ open, onClose, children }: Props & ModalProps) {
    return (
        <MUIModal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            {children}
        </MUIModal>
    )
}
