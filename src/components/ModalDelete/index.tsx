import React from 'react';

import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

import { t } from 'src/libs/intl';

import styles from './styles';

type Props = {
  openModal: boolean;
  handleCloseModal: () => void;
  onDelete: () => void;
  content: string | React.JSX.Element;
};

const ModalDeleteMyAddress: React.FC<Props> = ({ content, onDelete, openModal, handleCloseModal }) => {
  const handleClose = () => handleCloseModal();

  const handleDelete = () => {
    onDelete();
    handleCloseModal();
  };

  return (
    <div>
      <Modal open={openModal} onClose={handleClose}>
        <Box sx={styles.modalDelete}>
          <Typography variant="h6" component="h2">
            {t('Are you sure you want to delete?')}
          </Typography>
          <Typography sx={{ mt: 2 }}>{content}</Typography>
          <Box sx={styles.boxControl}>
            <Button sx={styles.boxCancel} onClick={handleClose}>
              {t('Cancel')}
            </Button>
            <Button variant="contained" sx={styles.boxDelete} onClick={handleDelete}>
              {t('OK')}
            </Button>
          </Box>
          <Button sx={styles.btnClose} onClick={handleClose}>
            <CloseIcon />
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalDeleteMyAddress;
