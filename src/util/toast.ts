import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";

// 스타일드 컴포넌트로 컨테이너 스타일링
export const StyledToastContainer = styled(ToastContainer)`
  .Toastify__toast--success {
    background-color: #4caf50;
    border-radius: 5px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    font-weight: bold;
    animation: fadeIn 0.5s;
  }

  .Toastify__toast--warning {
    background-color: #ffc107;
    border-radius: 5px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    font-weight: bold;
    animation: fadeIn 0.5s;
  }
`;

// 성공 메세지 함수
export const successToast = (message: string) => {
  toast.success(message, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

// 경고 메세지 함수
export const warnToast = (message: string) => {
  toast.warn(message, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};
