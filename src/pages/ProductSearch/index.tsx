import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Paper } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useQuery } from '@tanstack/react-query';

import { Product } from 'src/common/types';
import FilterPanel from 'src/components/FilterPanel';
import Pagination from 'src/components/Pagination';
import ProductItem from 'src/components/ProductItem';
import useDebounce from 'src/hooks/useDebounce';
import { t } from 'src/libs/intl';

import { getBrands } from '../HomePage/httpClients';
import { getFilterProducts } from './services';
import styles from './styles';

function ProductSearch() {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get('categoryId');
  const searchValue = searchParams.get('q');
  const isBestSelling = searchParams.get('best_selling');

  const [price, setPrice] = useState({ price_min: '0', price_max: '500000' });
  const [page, setPage] = useState<number>(1);
  const [brand, setBrand] = useState<string | null>(null);
  const [isShowEmpty, setIsShowEmpty] = useState(false);

  const priceDebounce = useDebounce(price, 700);
  const brandDebounce = useDebounce(brand, 700);
  const isShowEmptyDebounce = useDebounce(isShowEmpty, 700);

  const { data: listBrand = [] } = useQuery({
    queryKey: ['getBrands'],
    queryFn: () => getBrands(),
    retry: 0,
    select: ({ data: { data } }) => data,
  });

  const { data: listFilterProduct = {} } = useQuery({
    queryKey: ['getFilterProducts', priceDebounce, brandDebounce, categoryId, page, searchValue, isBestSelling],
    queryFn: () =>
      getFilterProducts({
        page,
        brand: brand,
        name: searchValue,
        category: categoryId,
        price_max: price.price_max || '0',
        price_min: price.price_min || '0',
        best_selling: Boolean(isBestSelling),
      }),
    retry: 0,
    select: ({ data }) => data,
  });

  const handleProductSearch = (p: number) => {
    setPage(p);
  };

  useEffect(() => {
    setPage(1);
  }, [categoryId, searchValue, isBestSelling, priceDebounce, brandDebounce]);

  useEffect(() => {
    if (listFilterProduct.meta) {
      if (listFilterProduct.meta.totalResults != 0) {
        setIsShowEmpty(false);
      } else {
        setIsShowEmpty(true);
      }
    }
  }, [listFilterProduct]);

  return (
    <div style={{ backgroundColor: '#f8f8f8', paddingBottom: '30px' }}>
      <Container maxWidth="lg" sx={{ margin: '32px auto' }}>
        <Grid container spacing={{ xs: 3 }}>
          <FilterPanel setPrice={setPrice} setBrand={setBrand} listBrand={listBrand} />
          <Grid item xs={12} lg={9} display="flex" flexDirection="column" justifyContent="space-between">
            <Paper sx={styles.paperSortBar}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Box component="p" sx={styles.boxQuantityResult}>
                  {`${t('Showing')} `}
                </Box>
                {listFilterProduct.data ? listFilterProduct.data.length : 0}
                <Box component="p" sx={styles.boxQuantityResult}>
                  {`${t('of')} `}
                </Box>
                {listFilterProduct.meta ? listFilterProduct.meta.totalResults : 0}
                <Box component="p" sx={styles.boxQuantityResult}>
                  {`${t('results')} `}
                </Box>
              </Box>
            </Paper>
            {!isShowEmptyDebounce ? (
              <Grid container spacing={{ xs: 3 }}>
                {listFilterProduct.data?.map((item: Product) => (
                  <ProductItem product={item} key={item.name} />
                ))}
              </Grid>
            ) : (
              <Box display="flex" justifyContent="center" sx={{ marginTop: '30px' }}>
                <img
                  src="https://cdni.iconscout.com/illustration/premium/thumb/sorry-item-not-found-3328225-2809510.png?f=webp"
                  alt=""
                  width="60%"
                />
              </Box>
            )}
            <Box sx={styles.boxQuantityPaginationProduct}>
              {listFilterProduct.meta && listFilterProduct.meta.totalPages > 1 && (
                <Pagination
                  count={listFilterProduct.meta ? listFilterProduct.meta.totalPages : 0}
                  page={page}
                  onChange={handleProductSearch}
                />
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export const Component = ProductSearch;
