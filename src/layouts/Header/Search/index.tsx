import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import ClearIcon from '@mui/icons-material/Clear';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Box, FormControl, OutlinedInput } from '@mui/material';
import Button from '@mui/material/Button';
import { useQuery } from '@tanstack/react-query';

import useDebounce from 'src/hooks/useDebounce';
import { t } from 'src/libs/intl';
import { PATH_PUBLIC } from 'src/routes/paths';

import { getSearchResult } from './service';
import styles from './styles';
import { Product, SubmitForm } from './types';

export default function Search() {
  const inputRef = useRef();
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState<string>('');
  const [searchResult, setSearchResult] = useState<Product[]>([]);
  const [showResult, setShowResult] = useState<boolean>(false);

  const debouncedValue = useDebounce(searchValue, 700);

  const handleHideResult = () => setShowResult(false);

  const outlinedInputClasses = styles.useOutlinedInputStyles();

  const { register, handleSubmit } = useForm<SubmitForm>({
    mode: 'onChange',
  });

  const onSubmit = () => {
    if (debouncedValue === '') return;

    const inputElement = inputRef.current as unknown as HTMLInputElement;

    inputElement.blur();
    handleHideResult();
    navigate(PATH_PUBLIC.product.search(searchValue));
  };

  const handleClickItem = (slug: string, productId: string) => {
    handleHideResult();
    navigate(PATH_PUBLIC.product.slug(slug, productId));
  };

  const handleClickMore = (value: string) => {
    handleHideResult();
    navigate(PATH_PUBLIC.product.search(value));
  };

  const handleChange = (e: React.PointerEvent<HTMLInputElement>) => {
    const searchValue = e.currentTarget.value;

    if (!searchValue.startsWith(' ')) {
      setSearchValue(searchValue);
    }
  };

  const handleClear = () => {
    const inputElement = inputRef.current as unknown as HTMLInputElement;

    setSearchValue('');
    setSearchResult([]);

    inputElement.focus();
  };

  useEffect(() => {
    if (!debouncedValue.trim()) {
      setSearchResult([]);
    }
  }, [debouncedValue]);

  const { isFetching } = useQuery({
    queryKey: ['search', debouncedValue],
    queryFn: () => getSearchResult(debouncedValue),
    enabled: !!debouncedValue,
    onSuccess: ({ data: { data, status } }) => {
      if (status) {
        setShowResult(true);
        setSearchResult(data);
      }
    },
  });

  const renderResult = () => {
    let resultMap: Product[] = [];
    let isMore = false;

    if (searchResult.length > 5) {
      resultMap = searchResult.slice(0, 5);
      isMore = true;
    } else {
      resultMap = searchResult;
      isMore = false;
    }

    return (
      <Box sx={styles.boxResult}>
        {resultMap.map(product => (
          <Box
            component={'div'}
            key={product._id}
            sx={{ cursor: 'pointer' }}
            onClick={() => handleClickItem(product.slug, product._id)}
          >
            <Box sx={styles.boxWrapper}>
              <Box component={'img'} sx={styles.boxImage} src={product.thumbnail} alt={product.name} />
              <Box component={'span'} sx={styles.boxTitle}>
                {product.name}
              </Box>
            </Box>
          </Box>
        ))}
        {isMore && <Box onClick={() => handleClickMore(searchValue)}>More...</Box>}
      </Box>
    );
  };

  return (
    <Box>
      <Box component={'form'} noValidate sx={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth sx={styles.formControl}>
          <OutlinedInput
            classes={outlinedInputClasses}
            sx={styles.outlineInput}
            fullWidth
            {...register('searchValue', {
              onChange: e => handleChange(e),
            })}
            inputRef={e => {
              inputRef.current = e;
            }}
            onFocus={() => setShowResult(true)}
            value={searchValue}
            size="small"
            placeholder={t('Search Product...')}
            endAdornment={
              <Button
                variant="contained"
                sx={styles.btnSearch}
                onClick={() => navigate(PATH_PUBLIC.product.search(searchValue))}
              >
                {t('Search')}
              </Button>
            }
          />
          {!!searchValue && !isFetching && <ClearIcon fontSize="small" sx={styles.closeIcon} onClick={handleClear} />}
          {isFetching && <RefreshIcon fontSize="small" sx={styles.loadingIcon} />}
        </FormControl>
      </Box>
      {showResult && !!searchResult.length && renderResult()}
    </Box>
  );
}
