import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import "./Confirm.scss"; // Import the CSS file

interface ConfirmProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  object: any;
}

const Confirm: React.FC<ConfirmProps> = ({
  open,
  onClose,
  onConfirm,
  object,
}) => {
  return (
    <Dialog open={open} onClose={onClose} className="confirm">
      <DialogTitle>Confirmar eliminación</DialogTitle>
      <DialogContent>
        <p>{`¿Estás seguro de que deseas eliminar a ${object?.name}?`}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={onConfirm} color="primary">
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Confirm;
