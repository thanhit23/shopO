import * as React from 'react';
import toast from 'react-hot-toast';

import { LoadingButton } from '@mui/lab';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import { useMutation } from '@tanstack/react-query';

import { t } from 'src/libs/intl';
import { TData } from 'src/pages/Profile';
import { Order } from 'src/pages/admin/commonts/types';

import { deleteOrder as deleteOrderService } from '../../httpClient';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

type Props = {
  row: Order;
  refetchData: () => void;
};

const ModalEdit: React.FC<Props> = ({ row, refetchData }) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const deleteOrder = useMutation({
    mutationFn: () => deleteOrderService(row?._id),
    onSuccess: async ({ data: { status, message } }: TData) => {
      if (status) {
        refetchData();

        setOpen(false);

        toast.success(t('Delete Successfully'));
      } else {
        toast.error(message);
      }
    },
  });

  return (
    <div>
      <Button onClick={handleOpen} color="error">
        Delete
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              Delete Order
            </Grid>
            <Grid item xs={12}>
              Are you sure you want to delete this order?
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '15px' }}>
            <LoadingButton variant="contained" loading={deleteOrder.isLoading} onClick={() => deleteOrder.mutate()}>
              {t('Submit')}
            </LoadingButton>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalEdit;
