import React from 'react';

import Main from 'components/Main';
import Sidebar from 'components/Sidebar';

import { Grid } from './styled';

const Layout: React.FC = ({ children }) => (
  <Grid>
    <Sidebar />
    <Main>{children}</Main>
  </Grid>
);

export default Layout;
