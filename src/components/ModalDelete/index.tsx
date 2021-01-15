import React from 'react';

import { ModalContainer, BackgroundModal, Content } from './styles';

interface ModalProps {
  setIsOpen: () => void;
  handleDelete?: () => void;
}

const ModalDelete: React.FC<ModalProps> = ({ setIsOpen, handleDelete }) => (
  <>
    <BackgroundModal onClick={setIsOpen} />
    <ModalContainer>
      <h2>Deseja deletar?</h2>
      <Content>
        <button type="button" onClick={setIsOpen}>
          Cancelar
        </button>
        <button type="button" onClick={handleDelete}>
          Deletar
        </button>
      </Content>
    </ModalContainer>
  </>
);

export default ModalDelete;
