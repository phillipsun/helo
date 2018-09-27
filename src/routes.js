import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Auth from './component/Auth/Auth';
import Dashboard from './component/Dashboard/Dashboard';
import Post from './component/Post/Post';
import Form from './component/Form/Form';

export default (
  <Switch>
    <Route path='/' exact component={Auth} />
    <Route path='/dashboard' component={Dashboard} />
    <Route path='/post/:id' component={Post} />
    <Route path='/new' component={Form} />
  </Switch>
)