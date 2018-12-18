import React from 'react';
import './Home.css';
import Header from '../../common/header/Header';

class Home extends React.Component {

  render(){
    return(
      <div style={{marginTop:100}}>
        <Header></Header>
      </div>
    );
  }
}

export default Home;
