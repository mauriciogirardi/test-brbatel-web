import styled, { keyframes } from 'styled-components';

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
  align-items: center;
  display: flex;
  justify-content: center;
  height: 100vh;
`;

export const Content = styled.div`
  text-align: right;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
  padding: 50px;
  border-radius: 8px;
  animation: ${animate} 1s;

  a {
    position: relative;
    color: #20694d;
    display: inline-block;
    font-weight: 500;
    margin-top: 30px;
    padding: 5px 10px;
    transition: 0.5s;
    z-index: 1;

    &:hover {
      color: #ffff;
    }

    &::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 100%;
      height: 100%;
      border-top: 1px solid #35947c;
      border-bottom: 1px solid #35947c;
      transform: scaleY(2);
      opacity: 0;
      transition: 0.5s;
      z-index: -1;
    }

    &:hover::before {
      transform: scaleY(1.2);
      opacity: 1;
    }

    &::after {
      content: '';
      position: absolute;
      top: 1px;
      right: 0;
      width: 100%;
      height: 100%;
      background-color: #35947c;
      transform: scale(0);
      transition: 0.5s;
      z-index: -1;
    }

    &:hover::after {
      transform: scale(1);
    }
  }
`;

export const Logo = styled.div`
  text-align: center;
  margin-bottom: 50px;
  display: flex;
  align-items: center;
  justify-content: center;

  h1 {
    background-color: #227968;
    display: inline-block;
    padding: 10px;
    color: #fff;
    font-size: 35px;
    border-radius: 8px;
  }

  h2 {
    font-size: 35px;
    margin-left: 5px;
  }
`;

export const Title = styled.h2`
  align-items: center;
  color: #192d35;
  display: flex;
  margin-bottom: 20px;

  > div {
    background-color: #192d35;
    margin-left: 8px;
    flex: 1;
    width: 100%;
    height: 2px;
  }
`;
