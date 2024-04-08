import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import Slider from '@mui/material/Slider';

import formatterPrice from 'src/helpers/formatPrice';
import { t } from 'src/libs/intl';

import styles from './styles';

type Props = {
  listBrand: {
    _id: string;
    logo: string;
    name: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
  }[];
  setPrice: React.Dispatch<
    React.SetStateAction<{
      price_min: string;
      price_max: string;
    }>
  >;
  setBrand?: React.Dispatch<React.SetStateAction<string | null>>;
};

function FilterPanel({ listBrand, setPrice, setBrand = () => {} }: Props) {
  const [arrayBrand, setArrayBrand] = useState<string>('');
  const [value, setValue] = useState([0, 500000]);

  const handleBrandChange = (brandId: string) => {
    setArrayBrand(brandId);
    setBrand(brandId || null);
  };

  const handleChange = (_: Event, newValue: number[] | number) => {
    setValue(newValue as number[]);
    setPrice(prev => ({
      ...prev,
      price_min: (newValue as number[])[0].toString(),
      price_max: (newValue as number[])[1].toString(),
    }));
  };

  return (
    <Grid item xs={12} lg={3}>
      <Paper sx={styles.wrapPaper}>
        <Box component="h6" sx={styles.boxPriceRange}>
          {t('Price Range')}
        </Box>
        <Box sx={styles.boxQuantityPriceRange}>
          <Slider
            getAriaLabel={() => 'Temperature range'}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            min={0}
            max={1000000}
          />
          <Box>{`${formatterPrice.format(value[0])} - ${formatterPrice.format(value[1])}`}</Box>
        </Box>
        <Divider sx={styles.dividerTwo} />
        <Box component="h6" sx={styles.boxPriceRange}>
          {t('Nhãn hiệu')}
        </Box>
        {listBrand.map(item => (
          <FormControlLabel
            checked={item._id === arrayBrand}
            key={item.name}
            sx={styles.flex}
            onChange={() => handleBrandChange(item._id)}
            control={<Radio color="default" size="small" />}
            label={<Box sx={styles.labelFormControl}>{item.name}</Box>}
          />
        ))}
      </Paper>
    </Grid>
  );
}

export default FilterPanel;
