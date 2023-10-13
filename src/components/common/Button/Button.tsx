import React from "react";
import * as St from "./STButton";
interface ButtonProps {
  children: React.ReactNode;
  onClick: () => Promise<void>;
}

const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return <St.Button onClick={onClick}>{children}</St.Button>;
};

export default Button;
