import * as React from 'react';

import { Box, Pagination } from '@mui/material';
import Alert from '@mui/material/Alert';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { ListCategory } from 'src/common/types';
import covertDate from 'src/helpers/covertDate';
import { Meta } from 'src/pages/admin/commonts/types';

import ModalDelete from './ModalDelete';
import ModalEdit from './ModalEdit';

type Props = {
  meta: Meta;
  rows: ListCategory[];
  headerRows: string[];
  refetchData: () => void;
  onChangePage: (page: number) => void;
};

const BasicTable: React.FC<Props> = ({ headerRows, rows, meta, onChangePage, refetchData }) => {
  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    onChangePage(newPage);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {headerRows.map((row, index) => (
              <TableCell key={index} align="left">
                {row}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">{row?.deleteAt ? covertDate(row?.deleteAt) : '-'}</TableCell>
              <TableCell align="left">
                <Box sx={{ display: 'flex', gap: '5px' }}>
                  <ModalEdit row={row} refetchData={refetchData} />
                  <ModalDelete row={row} refetchData={refetchData} />
                </Box>
              </TableCell>
            </TableRow>
          ))}
          {rows.length === 0 && (
            <TableCell colSpan={6}>
              <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert severity="info">No Data !</Alert>
              </Stack>
            </TableCell>
          )}
        </TableBody>
      </Table>

      <Box sx={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
        <Pagination count={meta.totalPages} page={meta.page} onChange={handleChangePage} variant="outlined" />
      </Box>
    </TableContainer>
  );
};

export default BasicTable;
