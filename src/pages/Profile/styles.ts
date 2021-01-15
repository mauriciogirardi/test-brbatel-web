import { shade } from 'polished';
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
  max-width: 350px;
  width: 100%;
  margin: 0 auto;
`;

export const Content = styled.div`
  border-radius: 8px;
  animation: ${animate} 1s;

  form {
    button {
      width: 100%;
      margin-top: 15px;
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

export const ImageProfile = styled.div`
  background-color: #ccc;
  width: 180px;
  height: 180px;
  border-radius: 50%;
`;

export const Avatar = styled.div`
  position: relative;
  margin-bottom: 30px;
  margin-left: 80px;

  img {
    width: 180px;
    height: 180px;
    border-radius: 50%;
    object-fit: cover;
  }

  label {
    background-color: #227968;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    position: absolute;
    bottom: 0;
    right: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s;
    cursor: pointer;

    input {
      display: none;
    }

    > svg {
      font-size: 24px;
      color: #ffffff;
    }

    &:hover {
      background-color: ${shade(0.2, '#227968')};
    }
  }

  @media (max-width: 500px) {
    margin-top: 20px;
  }
`;
