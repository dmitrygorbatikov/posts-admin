import { FC, ReactNode } from "react";
import { FormControl, InputLabel, OutlinedInput } from "@mui/material";
import { Field } from "formik";
import * as React from "react";
import { observer } from "mobx-react";

interface ICustomOutlinedInputProps {
  formControlProps: any;
  label: string;
  fieldName: string;
  setFocus?: (focus: boolean) => void;
  onBlur?: (value: any) => Promise<void>;
  errors?: boolean;
  endAdornment?: (value: any) => ReactNode;
  numeric?: boolean;
  multiline?: boolean;
  rows?: number;
}
const CustomValidationInput: FC<ICustomOutlinedInputProps> = ({
  formControlProps,
  label,
  fieldName,
  setFocus,
  onBlur,
  errors,
  endAdornment,
  numeric,
  multiline,
  rows,
}) => {
  return (
    <FormControl {...formControlProps}>
      <InputLabel>{label}</InputLabel>
      <Field name={fieldName}>
        {(value: any) => (
          <OutlinedInput
            multiline={multiline}
            rows={rows}
            type={numeric ? "number" : "text"}
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
            }}
            onBlur={async () => {
              setFocus && setFocus(false);
              value.form.setFieldTouched(fieldName, true);
              onBlur && (await onBlur(value));
            }}
            onFocus={(e) => {
              setFocus && setFocus(true);
            }}
            label={label}
            error={
              errors ||
              (value.form.touched[fieldName] &&
                Boolean(value.form.errors[fieldName]))
            }
            endAdornment={endAdornment && endAdornment(value)}
          />
        )}
      </Field>
    </FormControl>
  );
};

export default CustomValidationInput;
