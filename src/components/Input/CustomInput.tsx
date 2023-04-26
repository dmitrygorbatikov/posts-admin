import { ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, FilledInput, FormControl, InputLabel } from "@mui/material";

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
  sx?: any;
};

const CustomInput = ({
  type,
  value,
  label,
  endAdornment,
  autoComplete,
  error,
  changeHandler,
  touched,
  disabled,
  onFocus,
  onBlur,
  handleSubmit,
  sx,
}: Props): JSX.Element => {
  const hasError = error && touched;
  const { t } = useTranslation();

  return (
    <Box>
      <FormControl sx={{ m: 2, width: 400, ...sx }} variant="filled">
        <InputLabel>{label}</InputLabel>
        <FilledInput
          fullWidth
          type={type}
          value={value}
          endAdornment={endAdornment}
          error={!!hasError}
          autoComplete={autoComplete}
          onChange={(e) => changeHandler(e)}
          disabled={disabled}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit && handleSubmit();
            }
          }}
        />
      </FormControl>
      {hasError && (
        <Box sx={{ m: 2, mt: 0 }}>{error && t(`Errors.${error}`)}</Box>
      )}
    </Box>
  );
};

export default CustomInput;
