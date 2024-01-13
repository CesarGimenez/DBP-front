import React from 'react';
import { Modal, Backdrop, Fade } from '@mui/material';

type Props = {
  open: boolean;
  onClose: () => void;
  ariaLabelledby: string;
  ariaDescribedby: string;
};

interface MyModalProps {
  open: boolean;
  onClose: () => void;
}

const MyModal: React.FC<MyModalProps> = ({ open, onClose }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
    //   BackdropComponent={Backdrop}
    //   BackdropProps={{
    //     timeout: 500,
    //   }}
    >
      <Fade in={open}>
        <div>
          {/* Contenido del modal */}
        </div>
      </Fade>
    </Modal>
  );
};

export default MyModal;