import React, { ChangeEvent, useCallback, useRef } from 'react';
import { FaUser, FaLock, FaRegEnvelope } from 'react-icons/fa';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { FiCamera } from 'react-icons/fi';

import api from 'service/api';
import { useToast } from 'hooks/toast';
import { useAuth } from 'hooks/auth';

import Input from 'components/Input';
import Button from 'components/Button';

import getValidationErrors from 'utils/getValidationErrors';
import { Container, Content, Title, ImageProfile, Avatar } from './styles';

interface FormData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const { addToast } = useToast();
  const { user, updateUser } = useAuth();

  const formRef = useRef<FormHandles>(null);

  const handleAvatarChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();

        data.append('avatar', e.target.files[0]);

        await api.patch('/users/avatar', data).then(response => {
          updateUser(response.data);

          addToast({
            type: 'success',
            title: 'Avatar atualizado com sucesso.',
          });
        });
      }
    },
    [addToast, updateUser],
  );

  const handleSubmit = useCallback(
    async (data: FormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório.'),

          email: Yup.string()
            .required('E-mail obrigatório.')
            .email('Dígite um e-mail válido.'),

          old_password: Yup.string(),

          password: Yup.string().when('old_password', {
            is: val => !!val.length,
            then: Yup.string()
              .required('Campo obrigatório')
              .min(6, 'Minímo 6 digítos'),
            otherwise: Yup.string(),
          }),

          password_confirmation: Yup.string()
            .when('old_password', {
              is: val => !!val.length,
              then: Yup.string().required('Campo obrigatório'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password'), undefined], 'Confirmação incorreta'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const {
          name,
          email,
          password,
          old_password,
          password_confirmation,
        } = data;

        const formData = {
          name,
          email,
          ...(old_password
            ? {
                old_password,
                password,
                password_confirmation,
              }
            : {}),
        };

        const response = await api.put('/profile', formData);

        updateUser(response.data);

        addToast({
          type: 'success',
          title: 'Perfil atualizado com sucesso',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);
          formRef.current?.setErrors(error);
          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na atualização do perfil',
          description:
            'ocorreu um erro ao fazer atualização do perfil, tente novamente.',
        });
      }
    },
    [addToast, updateUser],
  );

  return (
    <Container>
      <Content>
        <Avatar>
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} />
          ) : (
            <ImageProfile />
          )}
          <label htmlFor="avatar">
            <FiCamera />
            <input type="file" id="avatar" onChange={handleAvatarChange} />
          </label>
        </Avatar>

        <Title>
          Meu perfil
          <div />
        </Title>

        <Form onSubmit={handleSubmit} initialData={user} ref={formRef}>
          <Input
            containerStyle={{ width: '100%' }}
            name="name"
            icon={FaUser}
            placeholder="Nome"
          />
          <Input
            containerStyle={{ width: '100%' }}
            name="email"
            icon={FaRegEnvelope}
            placeholder="E-mail"
          />

          <Input
            containerStyle={{ width: '100%' }}
            name="old_password"
            icon={FaLock}
            type="password"
            placeholder="Senha atual"
          />

          <Input
            containerStyle={{ width: '100%' }}
            name="password"
            icon={FaLock}
            type="password"
            placeholder="Nova senha"
          />

          <Input
            containerStyle={{ width: '100%' }}
            name="password_confirmation"
            icon={FaLock}
            type="password"
            placeholder="Corfirmar senha"
          />

          <Button type="submit">Confirmar mudanças</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default Profile;
