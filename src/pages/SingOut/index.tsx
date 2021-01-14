import React, { useCallback, useRef } from 'react';
import { FaUser, FaLock, FaRegEnvelope } from 'react-icons/fa';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { useToast } from 'hooks/toast';

import Input from 'components/Input';
import Button from 'components/Button';

import getValidationErrors from 'utils/getValidationErrors';
import { useHistory } from 'react-router-dom';
import api from 'service/api';
import { Container, Content, Title, Logo } from './styles';

interface FormData {
  email: string;
  password: string;
}

const SingOut: React.FC = () => {
  const { addToast } = useToast();
  const history = useHistory();

  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: FormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string().email().required('Email obrigatório'),
          password: Yup.string().min(6, 'No mínimo 6 digitos'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('users', data);

        addToast({
          type: 'success',
          title: 'Cadastro com sucesso',
          description: 'Você já pode fazer o login.',
        });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);
          formRef.current?.setErrors(error);
          return;
        }

        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: 'ocorreu um erro ao fazer o cadastro, tente novamente.',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Content>
        <Logo>
          <h1>br</h1>
          <h2>batel</h2>
        </Logo>

        <Title>
          Cadastro
          <div />
        </Title>

        <Form onSubmit={handleSubmit} ref={formRef}>
          <Input name="name" type="text" icon={FaUser} placeholder="Nome" />
          <Input
            name="email"
            type="text"
            icon={FaRegEnvelope}
            placeholder="E-mail"
          />
          <Input
            name="password"
            type="password"
            icon={FaLock}
            placeholder="Senha"
          />

          <Button type="submit">Cadastrar</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default SingOut;
