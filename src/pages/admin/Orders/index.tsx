import { useCallback, useState } from 'react';

import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';
import { useQuery } from '@tanstack/react-query';
import _ from 'lodash';

import { Meta, Order } from '../commonts/types';
import ProductTable from './OrderList';
import { getListOrders } from './httpClient';

export const removeEmptyKeys = (obj: { [key: string]: any }) =>
  _.omitBy(_.pickBy(obj, _.identity), (value: any) => value === ' ');

const Home = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchResult, setSearchResult] = useState<Order[]>([]);
  const [filter, setFilter] = useState<{ [key: string]: string | number }>({});
  const [meta, setMeta] = useState<Meta>({
    page: 0,
    limit: 0,
    totalPages: 0,
    totalResults: 0,
  });

  const handelFilter = useCallback(
    _.debounce((value: string) => {
      setFilter({ ...filter, ...removeEmptyKeys({ name: value }) });
    }, 700),
    [],
  );

  const handleSearch = (value: string) => {
    setSearchValue(value);

    handelFilter(value);
  };

  const { isFetching } = useQuery({
    queryKey: ['/admin/orders', filter],
    queryFn: ({ queryKey }) => getListOrders(_.omit(queryKey[1] as { [key: string]: any }, 'validate')),
    enabled: Object.keys(filter).length > 0 || searchResult.length === 0,
    onSuccess: ({ data: { data, status, meta: metaData } }) => {
      if (status) {
        setSearchResult(data);
        setMeta(metaData);
      }
    },
  });

  const handleChangePage = (page: number) => {
    setFilter({ ...filter, page });
  };

  const refetchData = () => {
    setFilter({ ...filter, validate: Date.now() });
  };

  return (
    <div>
      <Box padding="10px 0 20px" fontSize="20px" fontWeight={600}>
        Orders List
      </Box>
      <Box marginBottom="20px" display="flex" justifyContent="space-between">
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            value={searchValue}
            onChange={e => handleSearch(e.target.value)}
            disabled={isFetching}
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
      </Box>

      <ProductTable
        meta={meta}
        refetchData={refetchData}
        rows={searchResult}
        onChangePage={handleChangePage}
        headerRows={['User', 'Amount', 'Address', 'Phone Number', 'Status', 'Actions']}
      />
    </div>
  );
};

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    backgroundColor: '#ede7f6',
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export const Component = Home;
