import React from "react";
import * as St from "./STButton";
interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  bgcolor?: string;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, bgcolor }) => {
  return (
    <>
      <St.ButtonWrap onClick={onClick}>
        <St.Button bgcolor={bgcolor}>{children}</St.Button>
      </St.ButtonWrap>
    </>
  )
};

export default Button;
