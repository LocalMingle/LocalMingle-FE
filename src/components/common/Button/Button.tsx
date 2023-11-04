import React from "react";
import * as St from "./STButton";
interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  bgcolor?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  bgcolor,
  disabled,
}) => {
  return (
    <>
      <St.ButtonWrap>
        <St.Button bgcolor={bgcolor} onClick={onClick} disabled={disabled}>
          {children}
        </St.Button>
      </St.ButtonWrap>
    </>
  );
};

export default Button;
