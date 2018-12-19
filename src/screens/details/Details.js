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
    }
  }

  componentDidMount() {
    this.getRestaurantDetails(6);
  }

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
      console.log('state', that.state);
      console.log(that.state.categories.map((el) => (el.categoryName)))
    }).catch((error) => {
      console.log('error getting data', error);
    });
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
            <Typography variant="caption" gutterBottom style={{fontWeight:"bold"}}> CHINESE </Typography>
            <Divider />
            <div style={{display:"flex", flexDirection:"row", width:"100%", padding:"2%"}}>
              <div style={{width:"5%", display:"flex", alignItems:"center"}}><i class="fa fa-circle red" aria-hidden="true"></i></div> 
              <div style={{width:"75%", display:"flex", alignItems:"center"}}>Hakka Noodles</div>
              <div style={{width:"10%", display:"flex", alignItems:"center"}}><i class="fa fa-inr" aria-hidden="true"> 204 </i></div>
              <div style={{width:"10%", display:"flex", alignItems:"center"}}><Add style={{height:"100%"}} /></div>
            </div>
          </div>
        </div>

        {/* my-cart section */}
        <div style={{float:'right', width:'50%'}}>
          <div style={{padding:'3%'}}>
            <Card className={styles.card}>
              <CardContent>
                <div style={{display:"inline-block", width:"100%"}}>
                  <div style={{float:"left", width:"10%"}}><Badge badgeContent={0} color="primary"><ShoppingCart /></Badge></div>
                  <div style={{float:"right", width:"90%"}}><Typography variant="h5" gutterBottom style={{fontWeight:'bold'}}> My Cart </Typography></div>
                </div>
                <div style={{display:"inline-block", width:"100%"}}>
                  <div style={{float:"left"}}><Typography variant="body1" gutterBottom style={{fontWeight:'bold'}}> TOTAL AMOUNT </Typography></div>
                  <div style={{float:"right"}}><i class="fa fa-inr" aria-hidden="true"> 975 </i></div>
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


      </div>
    );
  }
}

export default Details;
