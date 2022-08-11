import styled from 'styled-components';

export const WrapperHeader = styled.header`
  width: 100vw;
  height: 60px;
  background: linear-gradient(45deg, #eaeaea, rgba(174, 157, 157, 0.7));
  align-items: center;
  display: flex;
  position: fixed;
  top: 0;
  z-index: 10;
`;

export const Field = styled.input`
  width: 100%;
  height: 40px;
  padding-left: 45px;
  border: 3px solid #e06666;
  border-radius: 20px;
  outline: none;
  font-size: 16px;
  background: rgba(234, 234, 234, 0.7);
  &:placeholder-shown {
    color: grey;
    font-size: 14px;
  }
`;

export const BtnSearch = styled.button`
  position: absolute;
  top: 0;
  left: 0px;
  width: 45px;
  height: 40px;
  /* background-color: #fff2cc; */
  border-style: solid hidden solid solid;
  border-width: 3px;
  border-color: #e06666;
  background: rgba(234, 234, 234, 0.3);
  border-radius: 20px 0 0 20px;
  cursor: pointer;
`;
