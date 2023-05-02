import { FC, ReactNode, useEffect, useState } from 'react';
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  Typography,
} from '@mui/material';
import { Field } from 'formik';
import * as React from 'react';
import Box from '@mui/material/Box';
import { IRequestError } from '../../../types';
import { useTranslation } from 'react-i18next';

interface ICustomOutlinedInputProps {
  formControlProps: any;
  label: string;
  fieldName: string;
  setFocus?: (focus: boolean) => void;
  onBlur?: (value: any) => Promise<void>;
  hasErrors?: boolean;
  endAdornment?: (value: any) => ReactNode;
  numeric?: boolean;
  multiline?: boolean;
  rows?: number;
  type?: string;
  errors?: IRequestError;
  clearErrors?: () => void;
  width?: number;
}
const CustomValidationInput: FC<ICustomOutlinedInputProps> = ({
  formControlProps,
  label,
  fieldName,
  setFocus,
  onBlur,
  hasErrors,
  endAdornment,
  numeric,
  multiline,
  rows,
  type,
  errors,
  width,
  clearErrors,
}) => {
  const [value, setValue] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    clearErrors && clearErrors();
  }, [value]);
  return (
    <FormControl {...formControlProps}>
      <InputLabel>{label}</InputLabel>
      <Field name={fieldName}>
        {(value: any) => (
          <Box>
            <OutlinedInput
              sx={{ width: width ? width : 'auto' }}
              multiline={multiline}
              rows={rows}
              type={numeric ? 'number' : type ? type : 'text'}
              value={value.field.value}
              onChange={(e) => {
                if (
                  (numeric && /^[0-9]*$/.test(e.target.value)) ||
                  parseInt(e.target.value) <= 10000
                ) {
                  value.form.setFieldValue(fieldName, e.target.value);
                } else if (!numeric) {
                  value.form.setFieldValue(fieldName, e.target.value);
                }
                setValue(e.target.value);
              }}
              onBlur={async () => {
                setFocus && setFocus(false);
                value.form.setFieldTouched(fieldName, true);
                onBlur && (await onBlur(value));
              }}
              onFocus={() => {
                setFocus && setFocus(true);
              }}
              label={label}
              error={
                (errors && errors[fieldName]) ||
                hasErrors ||
                (value.form.touched[fieldName] &&
                  Boolean(value.form.errors[fieldName]))
              }
              endAdornment={endAdornment && endAdornment(value)}
            />
            {hasErrors ||
              (value.form.touched[fieldName] &&
                Boolean(value.form.errors[fieldName]) && (
                  <Typography color={'error'}>
                    {t(
                      `Errors.${
                        value.form.errors[fieldName] ??
                        (errors && errors[fieldName])
                      }`
                    )}
                  </Typography>
                ))}
            {errors && errors[fieldName] && (
              <Typography color={'error'}>
                {t(`Errors.${errors[fieldName]}`)}
              </Typography>
            )}
          </Box>
        )}
      </Field>
    </FormControl>
  );
};

export default CustomValidationInput;
