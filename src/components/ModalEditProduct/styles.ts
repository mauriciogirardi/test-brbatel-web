import styled from 'styled-components';

export const ModalContainer = styled.div`
  background-color: #eeeeee;
  border-radius: 5px;
  max-width: 380px;
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10000;
  color: #333;
  padding: 40px;

  h1 {
    margin-bottom: 10px;
    font-size: 18px;
  }

  form {
    display: flex;
    flex-direction: column;
  }
`;

export const BackgroundModal = styled.button`
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10000;
  border: 0;
  cursor: alias;
`;
