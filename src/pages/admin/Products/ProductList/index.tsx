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

import { Meta, Product } from '../../commonts/types';
import ModalDelete from './ModalDelete';
import { Component as ModalEdit } from './ModalEdit';

type Props = {
  headerRows: string[];
  rows: Product[];
  meta: Meta;
  onChangePage: (page: number) => void;
  refetchData: () => void;
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
          {rows.map((row, index) => (
            <TableRow key={row.name + index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row" width="300px">
                <Box display="flex" gap={2} alignItems="center" width="300px">
                  <Box
                    component="img"
                    sx={{ objectFit: 'cover' }}
                    width="60px"
                    height="60px"
                    src={row?.thumbnail}
                    alt=""
                  />
                  <Box
                    sx={{
                      width: 200,
                      height: 45,
                      overflow: 'hidden',
                      display: '-webkit-box',
                      '-webkit-box-orient': 'vertical',
                      '-webkit-line-clamp': '2',
                    }}
                  >
                    {row.name}
                  </Box>
                </Box>
              </TableCell>
              <TableCell align="center">{row.price}</TableCell>
              <TableCell align="center">{row?.brand?.name}</TableCell>
              <TableCell align="center">{row?.category?.name}</TableCell>
              <TableCell align="center">{row?.sold}</TableCell>
              <TableCell align="center">{row?.totalComment}</TableCell>
              <TableCell align="right">
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
