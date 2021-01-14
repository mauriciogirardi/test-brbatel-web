import React, { createContext, useCallback, useContext, useState } from 'react';

import api from 'service/api';

interface User {
  id: string;
  name: string;
  email: string;
  occupation: string;
  avatar: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface IAuthContext {
  user: User;
  singIn(credential: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@brbatel:token');
    const user = localStorage.getItem('@brbatel:user');

    console.log('oi');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const singIn = useCallback(async ({ email, password }: SignInCredentials) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { user, token, auth } = response.data;

    console.log(auth);

    localStorage.setItem('@brbatel:token', token);
    localStorage.setItem('@brbatel:user', JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`;
    setData({ token, user });
  }, []);

  const updateUser = useCallback(
    (user: User) => {
      localStorage.setItem('@brbatel:user', JSON.stringify(user));

      setData({
        token: data.token,
        user,
      });
    },
    [setData, data.token],
  );

  const signOut = useCallback(() => {
    localStorage.removeItem('@brbatel:token');
    localStorage.removeItem('@brbatel:user');
    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: data.user, singIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): IAuthContext {
  const context = useContext(AuthContext);

  return context;
}
