import styled from "styled-components";

export const TabContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const TabItem = styled.div<{ tabColor: string }>`
  text-align: center;
  background-color: ${(props) => props.tabColor};
  cursor: pointer;
  border: 1px solid #d1d1d1;
  padding: 6px 8px;
  border-radius: 12px;
  font-size: 9px;
  letter-spacing: 2px; /* 글자 간격 추가 */
  line-height: 1.2; /* 줄 간격 추가 */
  overflow: hidden;
  text-overflow: ellipsis;
  &:hover {
    background-color: "hover시 색상";
  }

  @media (min-width: 480px) {
    padding: 10px;
    font-size: 10px;
  }
`;
