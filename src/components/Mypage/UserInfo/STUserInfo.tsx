import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

export const InputContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const Label = styled.label`
  font-weight: 400;
  font-size: 14px;
`;

export const Input = styled.input`
  width: 250px;
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding-left: 5px;
  &:focus {
    border-color: #75e1a3;
    outline: none;
  }
`;

export const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;
`;

export const ProfileImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
`;

export const ProfileTextButton = styled.button`
  width: 90px;
  height: 30px;
  background-color: transparent;
  border: none;
  border-radius: 5px;
  color: #333;
  cursor: pointer;
  &:hover {
    color: #15d467;
    text-decoration: underline;
  }
`;

export const SubmitButton = styled.button`
  width: 80px;
  height: 35px;
  background-color: #f7d16f;
  border: none;
  border-radius: 14px;
  color: #4e4343;
  cursor: pointer;
  &:hover {
    background-color: #efb92f;
  }
`;

export const EyeToggleButton = styled.button`
  position: absolute;
  right: 5px;
  top: 65%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
`;

export const ErrorMessageJoin = styled.div`
  font-size: 10px;
  color: #da7969;
  text-align: center;
`;

export const DupCheckButton = styled.button`
  margin-left: 10px;
  padding: 4px 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #edf895;
  cursor: pointer;
  font-size: 0.875rem;

  &:hover {
    background-color: #dcd584;
  }
`;
