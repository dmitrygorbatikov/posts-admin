import React, { ReactNode } from 'react';
import { FilledInput, FormControl, InputLabel } from '@mui/material';
import styles from './CustomInput.module.scss';

type Props = {
  type?: string;
  value: string;
  label: string;
  endAdornment?: ReactNode;
  autoComplete?: string;
  error?: string | undefined;
  changeHandler: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  touched?: boolean;
  disabled?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  handleSubmit?: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
  className?: string;
};

const CustomInput = ({
  type,
  value,
  label,
  endAdornment,
  autoComplete,
  changeHandler,
  disabled,
  onFocus,
  onBlur,
  handleSubmit,
  className,
}: Props): JSX.Element => {
  return (
    <FormControl className={`${styles.default} ${className}`} variant='filled'>
      <InputLabel>{label}</InputLabel>
      <FilledInput
        fullWidth
        type={type}
        value={value}
        endAdornment={endAdornment}
        autoComplete={autoComplete}
        onChange={(e) => changeHandler(e)}
        disabled={disabled}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSubmit && handleSubmit();
          }
        }}
      />
    </FormControl>
  );
};

export default CustomInput;
