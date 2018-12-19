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

// import image
import restImg from '../../assets/cafe-chairs-menu-6267.jpg';

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


class Home extends React.Component {

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
              src={restImg} 
              alt='restaurant'
              width='500px'
            />
          </div>
        </div>
        <div style={{float:'left'}}>
          <div style={{padding: '50px'}}>
            <Typography variant="h3" gutterBottom> Loud Silence </Typography> <br />
            <Typography variant="h5" gutterBottom> CBD - Belapur </Typography> <br />
            <Typography variant="body1" gutterBottom> Chinese, Continental, Indian, Italian, Snacks </Typography> <br />
            <div style={{float:'left'}}> 
              <div style={{padding:'70px'}}>
              <i class="fa fa-star" aria-hidden="true">4.4</i>
              <Typography variant="caption" gutterBottom> AVERAGE RATING BY <br /> <span style={{fontWeight: 'bold'}}>658</span> USERS </Typography>
              </div>
            </div>
            <div style={{float:'left'}}> 
              <div style={{padding:'70px'}}>
              <i class="fa fa-inr" aria-hidden="true">600</i>
              <Typography variant="caption" gutterBottom> AVERAGE COST FOR <br /> TWO PEOPLE </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* menu-items section */}
      <div>
      Chinese
      <Divider />
      <div>
        <i class="fa fa-circle red" aria-hidden="true"></i> Hakka Noodles
        <i class="fa fa-inr" aria-hidden="true"> 204 </i>
        <Add />
      </div>
      </div>

      {/* my-cart section */}
      <Card className={styles.card}>
      <CardContent>
        <Badge badgeContent={0} color="primary"><ShoppingCart /></Badge>
        <Typography variant="h5" gutterBottom style={{fontWeight:'bold'}}> My Cart </Typography> <br />
      </CardContent>
        <Typography variant="body1" gutterBottom style={{fontWeight:'bold'}}> TOTAL AMOUNT </Typography>
        <i class="fa fa-inr" aria-hidden="true"> 975 </i>
      <CardActions>
        <Button variant="contained" color="primary"> CHECKOUT </Button>
      </CardActions>
      </Card>


      </div>
    );
  }
}

export default Home;
