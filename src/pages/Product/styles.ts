import styled, { css, keyframes } from 'styled-components';

interface TdProps {
  alertQtd: boolean;
}

const animate = keyframes`
  0% {
    opacity: 0;
    transform: translateX(30px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }

`;

export const Container = styled.div`
  max-width: 950px;
  width: 100%;
  margin: 0 auto;
  padding: 0 16px;
  animation: ${animate} 1s;

  h1 {
    color: #333;
    font-size: 30px;
    margin-bottom: 30px;
  }
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  form {
    width: 100%;

    button {
      height: 40px;

      @media (max-width: 768px) {
        width: 230px;
      }
    }
  }

  @media (max-width: 768px) {
    margin-top: 50px;
  }

  @media (max-width: 500px) {
    form {
      button {
        width: 100%;
      }
    }
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    div {
      width: 230px !important;
    }
  }

  @media (max-width: 500px) {
    flex-wrap: wrap;

    div {
      width: 100% !important;
    }
  }
`;

export const AlertQtd = styled.td<TdProps>`
  ${props =>
    props.alertQtd &&
    css`
      color: #c53030;
      font-weight: bold;
      position: relative;

      &::before {
        content: 'Estoque baixo';
        font-size: 8px;
        font-weight: normal;
        position: absolute;
        top: 2px;
        left: 0;
      }
    `}
`;

export const Footer = styled.footer`
  margin-top: 12px;
  background-color: #fff;
  border: 1px solid #cfd2d6;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
