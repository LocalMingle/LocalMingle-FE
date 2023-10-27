import styled from "styled-components";

export const MyPageContainer = styled.div`
  position: relative;
  z-index: 10;
  top: -6px;
  border: 1px solid #e7e7e7;
  border-radius: 34px;
  padding: 5px;
  background: #fff;
  min-height: 630px;
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
  min-height: 630px;
`;

export const ErrorMessage = styled.div<{ isValid?: boolean | null }>`
  font-size: 12px;
  color: ${({ isValid }) =>
    isValid ? "#3ed643" : isValid === null ? "#e4381e" : "#da7969"};
  text-align: left;
  margin-top: 5px;
`;

export const DeleteUserWrap = styled.div`
  align-self: flex-start;
  width: 100%;
  margin-top: 30px;

  & > p {
    color: #646464;
    font-size: 15px;
    margin-bottom: 10px;
  }
`;

export const InputWrap = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 10px;

  & > input {
    width: 100%;
    border: 1px solid #e7e7e7;
    background: #fff;
    border-radius: 5px;
    padding: 10px;
  }

  & > ${ErrorMessage} {
    position: absolute;
    top: 100%;
    left: 0;
  }
`;

export const TextareaWrap = styled.div`
  position: relative;

  & > textarea {
    border-radius: 34px;
    border: 1px solid #e7e7e7;
    resize: none;
    min-height: 330px;
    width: 100%;
    padding: 20px;
  }

  & > ${ErrorMessage} {
    position: absolute;
    top: 100%;
    left: 0;
  }
`;

export const ButtonWrap = styled.div`
  margin: 30px 0;
`;

// export const AnimationContainer = styled.div`
//   width: 300px;
//   height: 300px;
//   margin: auto;
//   position: absolute;
//   top: 120%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   /* z-index: -1; // 231020 JSY 애니메이션으로 인해 textarea 특정 부분을 클릭해야 글 작성이 가능함 */
// `;
