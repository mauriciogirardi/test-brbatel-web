import React from 'react';
import { Switch } from 'react-router-dom';

import SingIn from 'pages/SingIn';

import Dashboard from 'pages/Dashboard';
import SingOut from 'pages/SingOut';
import Route from './Route';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SingIn} />
    <Route path="/singOut" component={SingOut} />

    <Route path="/dashboard" component={Dashboard} isPrivate />
  </Switch>
);

export default Routes;
