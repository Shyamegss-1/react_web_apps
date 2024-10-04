import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

export default function CustomTextField(props) {
  const {
    name = null,
    control,
    size = "medium",
    label,
    row,
    type = "text",
  } = props;

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: "This field is required" }}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <TextField
            focused
            type={type}
            label={label}
            size={size}
            onChange={onChange}
            fullWidth
            multiline={row && true}
            rows={row}
            value={value}
            {...props}
            error={error}
            helperText={error?.message}
          />
        );
      }}
    />
  );
}
