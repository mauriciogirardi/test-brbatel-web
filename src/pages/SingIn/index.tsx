import React, { useCallback, useRef } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import { useAuth } from 'hooks/auth';
import { useToast } from 'hooks/toast';

import Input from 'components/Input';
import Button from 'components/Button';

import getValidationErrors from 'utils/getValidationErrors';
import { Container, Content, Title, Logo } from './styles';

interface FormData {
  email: string;
  password: string;
}

const SingIn: React.FC = () => {
  const { singIn } = useAuth();
  const { addToast } = useToast();

  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: FormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .email('Dígite um e-mail válido')
            .required('Email obrigatório'),
          password: Yup.string().required('Senha obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await singIn({
          email: data.email,
          password: data.password,
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);
          formRef.current?.setErrors(error);
          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'ocorreu um erro ao fazer login, cheque as credenciais.',
        });
      }
    },
    [addToast, singIn],
  );

  return (
    <Container>
      <Content>
        <Logo>
          <h1>br</h1>
          <h2>batel</h2>
        </Logo>

        <Title>
          Login
          <div />
        </Title>

        <Form onSubmit={handleSubmit} ref={formRef}>
          <Input name="email" type="text" icon={FaUser} placeholder="E-mail" />
          <Input
            name="password"
            type="password"
            icon={FaLock}
            placeholder="Senha"
          />

          <Button type="submit">Entrar</Button>
        </Form>

        <Link to="/singOut">cadastrar</Link>
      </Content>
    </Container>
  );
};

export default SingIn;
