import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './screens/home/Home';
import { library } from '@fortawesome/fontawesome-svg-core'
import {faStar} from '@fortawesome/free-solid-svg-icons'
import {faRupeeSign} from '@fortawesome/free-solid-svg-icons'

library.add(faStar)
library.add(faRupeeSign)

const App = () => (
  <Switch>
    <Route exact path='/' render={({history}, props) => <Home {...props} history={history}/>} />
  </Switch>
)

export default App;
