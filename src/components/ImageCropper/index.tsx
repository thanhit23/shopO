import React, { useState } from 'react';
import toast from 'react-hot-toast';
import 'react-image-crop/dist/ReactCrop.css';
import { useIntl } from 'react-intl';

import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

import emptyFile from 'src/assets/images/emptyFile.png';

import styles from './styles';
import { Props, TData } from './types';

const ImageCropper: React.FC<Props> = ({ openModal, handleCloseModal, onUpdateAvatarUser }: Props) => {
  const handleClose = () => handleCloseModal();

  const { formatMessage } = useIntl();

  const [imgSrc, setImgSrc] = useState('');

  const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.value;
    if (!file) return;

    setImgSrc(file);
  };

  const handleUpload = async () => {
    const MESSAGE = {
      update: {
        avatarSuccess: formatMessage({ id: 'Update avatar success', defaultMessage: 'Update avatar success' }),
        avatarFailed: formatMessage({ id: 'Update avatar failed', defaultMessage: 'Update avatar failed' }),
      },
    };

    onUpdateAvatarUser.mutate(imgSrc, {
      onSuccess: ({ data: { status } }: TData) => {
        if (status) {
          handleClose();
          setImgSrc('');
          toast.success(MESSAGE.update.avatarSuccess);
        } else {
          toast.error(MESSAGE.update.avatarFailed);
        }
      },
    });
  };

  return (
    <React.Fragment>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles.boxWrapperModal}>
          <Box>
            Paste Link Image
            <Box sx={styles.boxWrapperInput}>
              <Box component={'input'} type="input" sx={styles.boxInput} onChange={handleSelectFile} />
            </Box>
            {!imgSrc && <Box sx={styles.boxNoImage} component={'img'} src={emptyFile} alt="No Image" />}
            {imgSrc && <Box sx={styles.boxNoImage} component={'img'} src={imgSrc} alt="Image" />}
            <Button
              sx={{
                marginTop: '15px',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                width: '100%',
              }}
              variant="contained"
              onClick={handleUpload}
            >
              Submit
            </Button>
          </Box>
          <Button sx={styles.btnClose} onClick={handleClose}>
            <CloseIcon />
          </Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default ImageCropper;
