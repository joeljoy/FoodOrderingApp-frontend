import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './screens/home/Home';
import Details from './screens/details/Details';
import Checkout from './screens/checkout/Checkout'
import { library } from '@fortawesome/fontawesome-svg-core'
import {faStar} from '@fortawesome/free-solid-svg-icons'
import {faRupeeSign} from '@fortawesome/free-solid-svg-icons'
import{faStopCircle} from '@fortawesome/free-solid-svg-icons'

library.add(faStar)
library.add(faRupeeSign)
library.add(faStopCircle)

class App extends React.Component{

  constructor(){
    super()
    this.state =  {
      itemList:[],
      restaurantId:0,
      cartTotal:0
    }
  }

  addItem = (items)=>{
    this.setState({
      itemList:items
    })
  }

  setRestaurantId = (id) => {
    this.setState({
      restaurantId:id
    });
  }

  setCartTotal = (total) => {
    this.setState({
      cartTotal:total
    })
  }

  render(){
    return (
      <Switch>
        <Route exact path='/' render={({history}, props) => <Home {...props} setRestaurantId={this.setRestaurantId} history={history} />} />
        <Route exact path='/details' render={({history}, props) => <Details {...props} history={history} restaurantId={this.state.restaurantId} addItems={this.addItem} setCartTotal={this.setCartTotal}/>} />
        <Route exact path='/checkout' render={({history}, props) => <Checkout {...props} items={this.state.itemList} total={this.state.cartTotal} history={history}/>} />
      </Switch>
    );
  }
}

export default App;
