import { shade } from 'polished';
import styled from 'styled-components';

export const ModalContainer = styled.div`
  background-color: #fff;
  border-radius: 5px;
  max-width: 300px;
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10000;
  color: #f4ede8;
  padding: 20px;

  h2 {
    margin-bottom: 10px;
    font-size: 20px;
    margin-bottom: 30px;
    color: #333;
  }
`;

export const BackgroundModal = styled.button`
  background-color: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10000;
  border: 0;
  cursor: alias;

  @media (max-width: 500px) {
    height: calc(100% + 100px);
  }
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    background-color: #3dab71;
    border-radius: 10px;
    border: 0;
    width: 120px;
    height: 40px;
    color: #fff;
    transition: background-color 0.2s;

    & + button {
      background-color: #c53030;
      &:hover {
        background-color: ${shade(0.2, '#c53030')};
      }
    }

    &:hover {
      background-color: ${shade(0.2, '#3dab71')};
    }
  }
`;
