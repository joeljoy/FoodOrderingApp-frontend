import React from 'react';
import './Home.css';
import Header from '../../common/header/Header';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {withStyles} from '@material-ui/core/styles';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';

const styles = {
  card: {
    width: 280,
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
  },
};

class Home extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      restaurantList:[],
      filteredRestaurantList:[],
    }
  }

  getGridListCols = () => {
      if (isWidthUp('xl', this.props.width)) {
        return 6;
      }

      if (isWidthUp('lg', this.props.width)) {
        return 5;
      }

      if (isWidthUp('md', this.props.width)) {
        return 4;
      }
      if (isWidthUp('sm', this.props.width)) {
        return 2
      }
      return 1;
  }

  searchHandler = (value) => {
    console.log('value', value);
    if (value !== '') {
      this.findRestaurantApiCall(value);
    }else {
      this.getAllRestaurantsApiCall();
    }
  }

  render(){
    const{classes} = this.props;
    console.log('width',this.props.width);
    return(
      <div style={{marginTop:100}}>
        <Header
          searchHandler={this.searchHandler}/>
        <div>
          <GridList cellHeight={'auto'} cols={this.getGridListCols()}>
            {this.state.filteredRestaurantList.map(item =>(
              <GridListTile key={item.id}>
                <HomeItem
                  item={item}
                  classes={classes}
                />
              </GridListTile>
            ))}
          </GridList>
        </div>
      </div>
    );
  }

  componentDidMount(){
    this.getAllRestaurantsApiCall();
  }

  getAllRestaurantsApiCall = () => {
    let that = this;
    let url = `http://localhost:8080/api/restaurant`;
    return fetch(url,{
      method:'GET',
    }).then((response) =>{
      console.log('response', response);
      if (response.ok) {
        return response.json();
      }
    }).then((responseJson)=>{
      console.log('json',responseJson);
      that.setState({
        restaurantList:responseJson,
        filteredRestaurantList:responseJson
      });
    }).catch((error) => {
      console.log('error login data',error);
    });
  }

  findRestaurantApiCall = (value) => {
    let that = this;
    let url = `http://localhost:8080/api/restaurant/name/${value}`;
    return fetch(url,{
      method:'GET',
    }).then((response) =>{
      console.log('response', response);
      if (response.ok) {
        return response.json();
      }
    }).then((responseJson)=>{
      console.log('json',responseJson);
      that.setState({
        restaurantList:responseJson,
        filteredRestaurantList:responseJson
      });
    }).catch((error) => {
      console.log('error login data',error);
    });
  }

}

function HomeItem(props){
  const{classes, item} = props;
  return(
    <div className="home-item-main-container">
      <Card style={{width:280}}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt={item.restaurantName}
            style={{objectFit: 'cover'}}
            height="140"
            image={item.photoUrl}
            title={item.restaurantName}/>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {item.restaurantName}
            </Typography>
            <Typography component="p">
              {item.categories}
            </Typography>
            <div style={{marginTop:25,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div style={{display:'flex',flexDirection:'row',backgroundColor:"#FDD835",padding:5,justifyContent:'space-evenly',alignItems:'center',width:80}}>
                <FontAwesomeIcon icon="star" color="white"/>
                <span className="white">{item.userRating}({item.numberUsersRated})</span>
              </div>
              <div>
                <FontAwesomeIcon size="sm" icon="rupee-sign" color="black"/>
                <span>{item.avgPrice} for two</span>
              </div>
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  )
}

export default withWidth()(Home);
