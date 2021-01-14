import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  margin-top: 10px;
  width: 300px;
  height: 45px;
  border: 0;
  border-radius: 8px;
  background-color: #20694d;
  color: #ffffff;
  font-size: 18px;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${shade(0.2, '#20694d')};
  }
`;
