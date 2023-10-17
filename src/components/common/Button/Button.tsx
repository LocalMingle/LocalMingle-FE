import React from "react";
import * as St from "./STButton";
interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <>
      <St.ButtonWrap onClick={onClick}>
        <St.Button>{children}</St.Button>
      </St.ButtonWrap>
    </>
  )
};

export default Button;
