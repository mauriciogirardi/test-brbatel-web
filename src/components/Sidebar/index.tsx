import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { ImHome, ImCart } from 'react-icons/im';
import { IoMdExit, IoIosReorder, IoMdClose } from 'react-icons/io';
import { FaUserCog } from 'react-icons/fa';

import { useAuth } from 'hooks/auth';
import {
  Container,
  Header,
  ImageFake,
  Bars,
  LogoutButton,
  Avatar,
} from './styles';

const Sidebar: React.FC = () => {
  const { user, signOut } = useAuth();
  const [toggle, setToggle] = useState(false);

  const handleMenuMobile = useCallback(() => {
    setToggle(prevState => !prevState);
  }, []);

  const handleLogout = useCallback(() => {
    signOut();
  }, [signOut]);

  return (
    <Container menuMobile={toggle}>
      <Bars type="button" onClick={handleMenuMobile}>
        {toggle ? <IoMdClose /> : <IoIosReorder />}
      </Bars>

      <Header>
        <Link to="/profile">
          <Avatar>
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} />
            ) : (
              <ImageFake />
            )}
            <FaUserCog />
          </Avatar>
          <div>
            <p>Bem,vindo</p>
            <span>{user.name}</span>
          </div>
        </Link>
      </Header>

      <ul>
        <li>
          <Link to="/">
            <ImHome />
            Dashboard
          </Link>
        </li>

        <li>
          <Link to="/products">
            <ImCart />
            Produtos
          </Link>
        </li>

        <li>
          <LogoutButton type="button" onClick={handleLogout}>
            <IoMdExit />
            Sair
          </LogoutButton>
        </li>
      </ul>
    </Container>
  );
};

export default Sidebar;
