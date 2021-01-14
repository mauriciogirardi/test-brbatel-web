import Tooltip from 'components/Tooltip';
import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isError: boolean;
}

export const Container = styled.div<ContainerProps>`
  position: relative;
  align-items: center;
  background-color: #ffffff;
  border: 1px solid #ffffff;
  border-radius: 8px;
  color: #192d35;
  display: flex;
  padding: 10px;
  width: 300px;
  margin-top: 8px;

  ${props =>
    props.isError &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #227968;
    `}

  ${props =>
    props.isFocused &&
    css`
      border-color: #227968;
      color: #227968;
    `}

  input {
    background-color: transparent;
    border: 0;
    margin-left: 8px;
    width: 100%;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  svg {
    margin: 0;
    cursor: pointer;
  }

  span {
    background-color: #c53030;

    &::after {
      background-color: #c53030;
    }
  }
`;
