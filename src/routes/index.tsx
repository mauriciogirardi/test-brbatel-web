import React from 'react';
import { Switch } from 'react-router-dom';

import SingIn from 'pages/SingIn';

import Dashboard from 'pages/Dashboard';
import SingOut from 'pages/SingOut';
import Layout from 'components/Layout';
import Profile from 'pages/Profile';
import Product from 'pages/Product';
import Route from './Route';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SingIn} />
    <Route path="/singOut" component={SingOut} />

    <Layout>
      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />
      <Route path="/products" component={Product} isPrivate />
    </Layout>
  </Switch>
);

export default Routes;
