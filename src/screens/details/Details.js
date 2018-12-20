import React from 'react';
import './Details.css';
import Header from '../../common/header/Header';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import Add from '@material-ui/icons/Add';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';

const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

class Details extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      restaurantName: null,
      photoUrl: null,
      userRating: null,
      avgPrice: null,
      numberUsersRated: null,
      locality: null,
      categories: [],
      itemAddedBarOpen: false,
      cartItems: 0,
      cartItemsList: [],
    }
  };

  componentWillMount() {
    this.getRestaurantDetails(6);
  };

  getRestaurantDetails = (id) => {
    let that = this;
    let url = `http://localhost:8080/api/restaurant/${id}`;
    return fetch(url, {
      method:'GET',
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
    }).then((responseJson) => {
      console.log('json', responseJson);
      that.setState({
        restaurantName: responseJson.restaurantName,
        photoUrl: responseJson.photoUrl,
        userRating: responseJson.userRating,
        avgPrice: responseJson.avgPrice,
        numberUsersRated: responseJson.numberUsersRated,
        locality: responseJson.address.locality,
        categories: responseJson.categories,
      });
    }).catch((error) => {
      console.log('error getting data', error);
    });
  };

  handleItemAddedBar = () => {
    this.setState({
      itemAddedBarOpen: !this.state.itemAddedBarOpen
    })
  }

  addItemHandler = (item) => {
    this.handleItemAddedBar();
    let cartItemsList = this.state.cartItemsList;
    
    let cartItems = cartItemsList.map((el) => el.item);
    let index = cartItems.indexOf(item);
    if (index === -1) {
      let cartItem = {
        item: item,
        quantity: 1,
      }
      cartItemsList.push(cartItem);
    } else {
      cartItemsList[index].quantity += 1;
    }

    this.setState({
      cartItems: this.state.cartItems + 1,
      cartItemsList: cartItemsList,
    })
    console.log(cartItemsList);
  }

  render(){
    return(
      <div>
      
      {/* Header */}
      <div style={{marginTop: '64px'}}>
        <Header />
      </div>

      {/* restaurant information section */}
      <div style={{background: 'rgb(211,211,211)', height: '400px'}}>
        <div style={{float:'left'}}>
          <div style={{padding: '30px'}}>
            <img 
              src={this.state.photoUrl}
              alt='restaurant'
              width='500px'
            />
          </div>
        </div>
        <div style={{float:'left'}}>
          <div style={{padding: '50px'}}>
            <Typography variant="h3" gutterBottom> {this.state.restaurantName} </Typography> <br />
            <Typography variant="h5" gutterBottom> {this.state.locality} </Typography> <br />
            <Typography variant="body1" gutterBottom> {this.state.categories.map((el) => el.categoryName).join(", ")} </Typography>
            <div style={{float:'left'}}> 
              <div style={{padding:'70px'}}>
              <i class="fa fa-star" aria-hidden="true"> {this.state.userRating} </i>
              <Typography variant="caption" gutterBottom> AVERAGE RATING BY <br /> <span style={{fontWeight: 'bold'}}> {this.state.numberUsersRated} </span> USERS </Typography>
              </div>
            </div>
            <div style={{float:'left'}}> 
              <div style={{padding:'70px'}}>
              <i class="fa fa-inr" aria-hidden="true"> {this.state.avgPrice} </i>
              <Typography variant="caption" gutterBottom> AVERAGE COST FOR <br /> TWO PEOPLE </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{display:'inline-block', width:'100%'}}>
        
        {/* menu-items section */}
        <div style={{float:'left', width:'50%'}}>
          <div style={{padding:'3%'}}>
            {this.state.categories.map(categoryItem =>
              <div key={categoryItem.id}>
                <CategoryItem item={categoryItem} this={this} />
              </div>
            )}
          </div>
        </div>

        {/* my-cart section */}
        <div style={{float:'right', width:'50%'}}>
          <div style={{padding:'3%'}}>
            <Card className={styles.card}>
              <CardContent>
                <div style={{display:"inline-block", width:"100%"}}>
                  <div style={{float:"left", width:"10%"}}><Badge badgeContent={this.state.cartItems} color="primary"><ShoppingCart /></Badge></div>
                  <div style={{float:"right", width:"90%"}}><Typography variant="h5" gutterBottom style={{fontWeight:'bold'}}> My Cart </Typography></div>
                </div>

                {/* items in cart */}
                {this.state.cartItemsList.map(cartItem =>
                  <div key={cartItem.id}>
                    <CartItem item={cartItem} this={this} />
                  </div>
                )}

                <div style={{display:"inline-block", width:"100%", paddingTop:"3%"}}>
                  <div style={{float:"left"}}><Typography variant="body1" gutterBottom style={{fontWeight:'bold'}}> TOTAL AMOUNT </Typography></div>
                  <div style={{float:"right", width: "14%"}}><i class="fa fa-inr" aria-hidden="true"> 975.00 </i></div>
                </div>
              </CardContent>
              <CardActions>
                <div style={{width:"100%"}}>
                  <Button style={{width:"100%"}} variant="contained" color="primary"> CHECKOUT </Button>
                </div>
              </CardActions>
            </Card>
          </div>
        </div>
      </div>

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={this.state.itemAddedBarOpen}
        autoHideDuration={6000}
        onClose={this.handleItemAddedBar}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">Item added to cart!</span>}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={this.handleItemAddedBar}
          >
          <CloseIcon />
          </IconButton>,
        ]}
      />

      </div>
    );
  }
}

function CartItem(props) {
  const cartItem = props.item;
  const color = cartItem.item.type === "Non-Veg" ? "red" : "green";
  return (
    <div style={{display:"flex", flexDirection:"row", width:"100%", padding:"1%"}}>
      <div style={{width:"10%", display:"flex", alignItems:"center"}}><i style={{color:color}} class="fa fa-stop-circle-o" aria-hidden="true"></i></div>
      <div style={{width:"40%", display:"flex", alignItems:"center", textTransform:"capitalize"}}><span style={{color:"grey"}}> {cartItem.item.itemName} </span></div>
      <div style={{width:"5%", display:"flex", alignItems:"center"}}><i class="fa fa-minus" aria-hidden="true" on></i></div>
      <div style={{width:"5%", display:"flex", alignItems:"center"}}> {cartItem.quantity} </div>
      <div style={{width:"25%", display:"flex", alignItems:"center"}}><i class="fa fa-plus" aria-hidden="true" on></i></div>
      <div style={{display:"flex", alignItems:"center"}}><i class="fa fa-inr" aria-hidden="true"><span style={{color:"grey"}}> {cartItem.item.price.toFixed(2)} </span></i></div>
    </div>
  )
}

function CategoryItem(props) {
  return (
    <div style={{padding:"1%"}}>
      <Typography variant="caption" gutterBottom style={{fontWeight:"bold", textTransform:"uppercase"}}> {props.item.categoryName} </Typography>
      <Divider />
      {props.item.items.map(menuItem =>
        <div key={menuItem.id}>
          <MenuItem item={menuItem} this={props.this} />
        </div>
      )}
    </div>
  )
};

function MenuItem(props) {
  const color = props.item.type === "Non-Veg" ? "red" : "green";
  return (
    <div style={{display:"flex", flexDirection:"row", width:"100%", padding:"2%"}}>
      <div style={{width:"5%", display:"flex", alignItems:"center"}}><i style={{color:color}} class="fa fa-circle" aria-hidden="true"></i></div>
      <div style={{width:"65%", display:"flex", alignItems:"center", textTransform:"capitalize"}}> {props.item.itemName} </div>
      <div style={{width:"20%", display:"flex", alignItems:"center"}}><i class="fa fa-inr" aria-hidden="true"> {props.item.price.toFixed(2)} </i></div>
      <div style={{width:"10%", display:"flex", alignItems:"center"}}>
        <IconButton onClick={(e) => props.this.addItemHandler(props.item)}><Add style={{height:"100%"}} /></IconButton>
      </div>
    </div>
  )
};

export default Details;
