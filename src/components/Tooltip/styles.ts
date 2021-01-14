import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  span {
    background-color: #227968;
    text-align: center;
    width: 170px;
    padding: 6px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 1px;
    color: #fff;
    opacity: 0;
    transition: opacity 0.4s;
    visibility: hidden;

    position: absolute;
    bottom: calc(100% + 10px);
    right: -10px;

    &::after {
      content: '';
      background-color: #227968;
      width: 10px;
      height: 10px;
      position: absolute;
      bottom: -5px;
      right: 16px;
      transform: rotate(45deg);
    }
  }

  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`;
