import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './screens/home/Home';
import Details from './screens/details/Details';

const App = () => (
  <Switch>
    <Route exact path='/' render={({history}, props) => <Details {...props} history={history}/>} />
  </Switch>
)

export default App;
