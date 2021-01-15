import styled, { css, keyframes } from 'styled-components';

interface FormHeaderProps {
  isFocused: boolean;
}

const animationHeader = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  animation: ${animationHeader} 0.8s;

  h1 {
    font-weight: 400;
    font-size: 24px;
    margin-bottom: 0;
  }

  @media (max-width: 500px) {
    flex-wrap: wrap;

    h1 {
      margin-bottom: 20px;
    }
  }
`;

export const FormHeader = styled.form<FormHeaderProps>`
  width: 400px;
  border-radius: 10px;
  background-color: #ffffff;
  border: 1px solid #ffffff;
  padding: 10px;
  display: flex;
  align-items: center;

  ${props =>
    props.isFocused &&
    css`
      border-color: #227968;
      color: #227968;
    `}

  svg {
    margin-right: 10px;
  }

  > input {
    flex: 1;
    background-color: transparent;
    border: 0;
    color: #333;

    &::placeholder {
      color: #666360;
    }
  }
`;
