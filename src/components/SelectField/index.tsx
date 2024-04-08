import React from 'react';
import { Controller } from 'react-hook-form';

import { FormControl } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

type Props = {
  name: string;
  label: string | React.ReactNode;
  options: { value: string | number; label: string }[];
  defaultValue?: string;
  control?: any;
};

const ReactHookFormSelect: React.FC<Props> = ({ name, label, control, defaultValue, options, ...props }) => {
  const labelId = `${name}-label`;

  return (
    <FormControl {...props} fullWidth>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Controller
        render={({ field }) => (
          <Select labelId={labelId} label={label} {...field}>
            {options.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        )}
        name={name}
        control={control}
        defaultValue={defaultValue}
      />
    </FormControl>
  );
};
export default ReactHookFormSelect;
