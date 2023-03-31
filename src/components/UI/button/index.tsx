import React from "react";
import { ButtonSC, IconWrapper } from "./styled";

export type ButtonProps = {
  text: React.ReactNode;
  icon?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ text, icon, ...props }: ButtonProps) => {
  return (
    <ButtonSC {...props}>
      <span>{text}</span>
      {icon && <IconWrapper>{icon}</IconWrapper>}
    </ButtonSC>
  );
};

export default Button;
