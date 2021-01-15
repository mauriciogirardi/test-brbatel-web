import styled from 'styled-components';

interface Mobile {
  menuMobile: boolean;
}

export const Container = styled.aside<Mobile>`
  background-color: #2e3740;
  grid-area: ASIDE;
  height: 100vh;
  overflow: hidden;
  transition: 0.4s;
  position: relative;

  @media (max-width: 768px) {
    height: ${props => (props.menuMobile ? '250px' : '85px')};
    position: fixed;
    width: 100%;
    z-index: 1;
    border-bottom: 4px solid #4e4e4f;
  }

  ul {
    li {
      padding: 10px 0 10px 20px;
      transition: background-color 0.2s;

      &:hover {
        background-color: #4e4e4f;
      }

      a {
        color: #ffffff;
        display: flex;
        align-items: center;
        font-weight: 500;

        svg {
          font-size: 25px;
          margin-right: 15px;
        }
      }
    }
  }
`;

export const Header = styled.header`
  padding: 18px 0 18px 8px;
  border-bottom: 1px solid #4e4e4f;
  a {
    color: #ffffff;
    display: flex;
    align-items: center;

    div {
      span {
        display: block;
      }

      p {
        font-weight: 500;
      }
    }
  }

  @media (max-width: 768px) {
    width: 200px;
    border-bottom: none;
  }
`;

export const ImageFake = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;

  svg {
    font-size: 30px;
    color: #2e3740;
    transition: color 0.2s;
  }

  &:hover svg {
    color: #4e4e4f;
  }
`;

export const Bars = styled.button`
  display: none;

  @media (max-width: 768px) {
    z-index: 1000;
    display: block;
    font-size: 30px;
    border: 0;
    background-color: transparent;
    color: #ffffff;
    position: absolute;
    top: 28px;
    right: 20px;
  }
`;

export const LogoutButton = styled.button`
  border: 0;
  background-color: transparent;
  color: #ffffff;
  font-weight: 500;
  display: flex;
  align-items: center;

  svg {
    font-size: 25px;
    margin-right: 15px;
  }
`;

export const Avatar = styled.div`
  position: relative;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
  }

  svg {
    font-size: 20px;
    color: #ffff;
    position: absolute;
    bottom: 0;
    right: 10px;
  }
`;
