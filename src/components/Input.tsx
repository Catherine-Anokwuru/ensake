import React from "react";
import { Input as ChakraInput } from "@chakra-ui/react";

type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> & {
  placeholder: string;
  placeholderColor?: string;
  type?: React.HTMLInputTypeAttribute;
  border?: string;
  borderRadius?: string;
  height?: string | number;
  width?: string | number;
  ps?: string | number;
  value?: string;
  size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  onInput?: React.FormEventHandler<HTMLInputElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onClick?: React.MouseEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = ({
  placeholder,
  placeholderColor,
  type,
  border,
  borderRadius,
  height,
  width,
  ps,
  value,
  size,
  onInput,
  onChange,
  onClick,
  onKeyDown,
  onBlur,
  ...rest
}) => {
  return (
    <ChakraInput
      placeholder={placeholder}
      _placeholder={{
        color: placeholderColor ?? "light_grey",
        fontSize: "16px",
        lineHeight: "24px",
        fontFamily: "inter",
      }}
      color={"black"}
      fontFamily={"inter"}
      border={border ?? "1px solid #E1E4EA"}
      borderRadius={borderRadius ?? "10px"}
      onInput={onInput}
      onChange={onChange}
      onClick={onClick}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
      ps={ps}
      type={type ?? "text"}
      h={height ?? "40px"}
      w={width ?? "100%"}
      value={value}
      size={size}
      {...rest}
    />
  );
};
export default Input;
