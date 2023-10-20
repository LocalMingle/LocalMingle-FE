import styled from "styled-components";

export const MyPageContainer = styled.div`
  position: relative;
  z-index: 10;
  top: -6px;
  border: 1px solid #e7e7e7;
  border-radius: 34px;
  padding: 5px;
  background: #fff;
`;

export const MyPageWrap = styled.div`
  background: #fff;
  width: 100%;
  border: 1px solid #adadad;
  border-radius: 29px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;
  margin-bottom: 20px;
`;

export const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid #292D32;
`;

export const ProfileTextButton = styled.button`
  background-color: transparent;
  border: none;
  color: #646464;
  font-size: 12px;
  cursor: pointer;

  &:hover {
    color: #333;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  width: 100%;

  & div {
    display: flex;
    align-items: center;

    & input {
      flex-grow: 1;
    }
  }

  & input {
    border: 1px solid #e7e7e7;
    background: #fff;
    border-radius: 5px;
    padding: 10px;
    font-size: 12px;
  }
`;

export const DupCheckButtonWrap = styled.div`
  border: 1px solid #e7e7e7;
  padding: 2px;
  margin-left: 5px;
  border-radius: 23px;
`;

export const DupCheckButton = styled.button`
  border: 1px solid #adadad;
  border-radius: 20px;
  background-color: #f7d16f;
  cursor: pointer;
  font-size: 12px;
  padding: 5px;
  color: #646464;
`;

export const Label = styled.label`
  font-size: 15px;
  color: #646464;
  margin-bottom: 10px;
`;

export const EyleToggleWrap = styled.div`
  position: relative;
`;

export const EyeToggleButton = styled.button`
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  color: #adadad;
  background: none;
  border: none;
  cursor: pointer;
`;

export const ErrorMessageJoin = styled.div<{ isValid: boolean | null }>`
  font-size: 12px;
  color: ${({ isValid }) => (isValid ? "#14be1d" : "#da7969")};
  text-align: left;
  margin-top: 5px;
`;

export const SubmitButtonWrap = styled.div`
  border-radius: 23px;
  border: 1px solid #e7e7e7;
  background: #fff;
  padding: 3px;
`;

export const SubmitButton = styled.button`
  box-sizing: border-box;
  border-radius: 20px;
  border: 1px solid #adadad;
  background: #edf895;
  color: #646464;
  text-align: center;
  height: 45px;
  padding: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  width: 120px;
`;

export const ErrorMessagePassword = styled.div`
  font-size: 12px;
  color: #da7969;
  text-align: left;
  margin-top: 5px;
`;
