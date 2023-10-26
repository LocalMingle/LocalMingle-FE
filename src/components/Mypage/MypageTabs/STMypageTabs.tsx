import styled, { keyframes } from "styled-components";

interface TabItemProps {
  tabcolor: string;
}

// Tab 애니메이션
const tabAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0);
  }
`

export const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: baseline;
  padding: 50px 16px 0;
  position: relative;
  z-index: 1;
`

export const TabWrap = styled.div`
  border: 1px solid #E7E7E7;
  border-radius: 23px 23px 0 0;
  padding: 2px;
  background: #fff;
  width: calc(100% / 4);
  &:hover {
    transition: background-color 0.3s;
    animation: ${tabAnimation} 0.5s ease;
  }
`

export const TabItem = styled.div<TabItemProps>`
  border: 1px solid #d1d1d1;
  border-radius: 20px 20px 0 0;
  padding: 10px 8px;
  text-align: center;
  cursor: pointer;
  font-size: 12px;
  background-color: ${(props) => props.tabcolor};
`
