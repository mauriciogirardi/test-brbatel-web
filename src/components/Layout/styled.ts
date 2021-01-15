import styled from 'styled-components';

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 250px auto;
  grid-template-areas: 'ASIDE MAIN';
  height: 100vh;

  @media (max-width: 768px) {
    grid-template-columns: auto;
    grid-template-rows: 60px auto;
    grid-template-areas:
      'ASIDE'
      'MAIN';
  }
`;
