import React from 'react';
import './Details.css';
import Header from '../../common/header/Header';

import Typography from '@material-ui/core/Typography';

// import image
import restImg from '../../assets/cafe-chairs-menu-6267.jpg';

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

      </div>
    );
  }
}

export default Home;
