import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from '../pages/Home'
import Repository from '../pages/Repository'

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/repos/:repository+" component={Repository} />
  </Switch>
)

export default Routes
