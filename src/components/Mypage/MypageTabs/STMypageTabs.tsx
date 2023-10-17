import styled from "styled-components";

export const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 75px;
  margin-bottom: 10px;
  gap: 10px;
`

export const TabWrap = styled.div`
  border: 1px solid #E7E7E7;
  border-radius: 23px;
  padding: 2px;
  background: #fff;
`

export const TabItem = styled.div<{ tabcolor: string }>`
  border: 1px solid #d1d1d1;
  border-radius: 20px;
  padding: 8px;
  text-align: center;
  cursor: pointer;
  font-size: 12px;
  overflow: hidden;
  background-color: ${(props) => props.tabcolor};
`
