import React from 'react';
import './Checkout.css';
import Header from '../../common/header/Header';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import CheckCircle from '@material-ui/icons/CheckCircle';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Divider from '@material-ui/core/Divider';
import Snackbar from '@material-ui/core/Snackbar';

const TabContainer = function(props) {
  return (<Typography component="div" style={{
      padding: 0,
      textAlign: 'left'
    }}>
    {props.children}
  </Typography>)
}

const styles = theme => ({
  tabContainer:{
    display:'flex',
    flexDirection:'column',
    width:'50%'
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2,
  },
  menu: {
    width: 200,
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
})

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value:0,
      addressList:[],
      activeStep:0,
      currentAddress:{},
      currentAddressId:0,
      flatNo:'',
      flatNoRequired:"dispNone",
      locality:'',
      localityRequired:"dispNone",
      city:'',
      cityRequired:"dispNone",
      states:[],
      state:'',
      stateRequired:"dispNone",
      paymentMode:'',
      paymentModeList:[],
      cartTotalPrice:props.total,
      snackMsg:'',
      isSnackVisible:false
    }
    console.log('cart items',sessionStorage.getItem("cartTotalPrice"));
    this.cartItemsList = props.items;
  }

  getSteps = () => {
    return ['Delivery','Payment'];
  }

  getDeliveryStep = () => {
    let that = this;
    return(
      <div>
        <Tabs className="tabs" value={this.state.value} onChange={this.handleChange}>
          <Tab label="Existing Address"/>
          <Tab label="New Address"/>
        </Tabs>
        {
          this.state.value === 0 &&
              <GridList className={this.props.classes.gridList} cols={3.5}>
                {this.state.addressList.map(address => (
                  <GridListTile key={address.id}>
                    {that.state.currentAddressId === address.id &&
                      <ButtonBase
                        className="address-container-selected"
                        focusRipple
                        onClick={that.addressClickHandler.bind(that,address)}>
                          <Typography>{address.flatBuilNo}</Typography>
                          <Typography>{address.locality}</Typography>
                          <Typography>{address.city}</Typography>
                          <Typography>{address.states.stateName}</Typography>
                          <Typography>{address.zipcode}</Typography>
                          <CheckCircle style={{color:"green",alignSelf:'flex-end',marginTop:30}}/>
                      </ButtonBase>
                    }
                    {that.state.currentAddressId !== address.id &&
                      <ButtonBase
                        className="address-container-normal"
                        focusRipple
                        onClick={that.addressClickHandler.bind(that,address)}>
                          <Typography>{address.flatBuilNo}</Typography>
                          <Typography>{address.locality}</Typography>
                          <Typography>{address.city}</Typography>
                          <Typography>{address.states.stateName}</Typography>
                          <Typography>{address.zipcode}</Typography>
                          <CheckCircle style={{color:"grey",alignSelf:'flex-end',marginTop:30}}/>
                      </ButtonBase>
                    }

                  </GridListTile>
                ))}
              </GridList>
        }
        {
          this.state.value === 1 &&
          <TabContainer>
            <div className={this.props.classes.tabContainer}>
              <FormControl>
                <InputLabel htmlFor="flatNo">Flat / Building No*</InputLabel>
                <Input id="flatNo" type="text" value={this.state.flatNo} onChange={this.flatNoChangeHandler}/>
                <FormHelperText className={this.state.flatNoRequired}>
                  <span className="red">required</span>
                </FormHelperText>
              </FormControl><br/><br/>
              <FormControl>
                <InputLabel htmlFor="locality">Locality*</InputLabel>
                <Input id="locality" type="text" value={this.state.locality} onChange={this.localityChangeHandler}/>
                <FormHelperText className={this.state.localityRequired}>
                  <span className="red">required</span>
                </FormHelperText>
              </FormControl><br/><br/>
              <FormControl>
                <InputLabel htmlFor="city">City*</InputLabel>
                <Input id="city" type="text" value={this.state.city} onChange={this.cityChangeHandler}/>
                <FormHelperText className={this.state.cityRequired}>
                  <span className="red">required</span>
                </FormHelperText>
              </FormControl><br/><br/>
              <FormControl>
                <TextField select value={this.state.state} onChange={this.stateChangeHandler} label="State*">
                  {that.state.states.map(state => (
                    <MenuItem key={state.id} value={state.stateName}>
                      {state.stateName}
                    </MenuItem>
                  ))}
                </TextField>
                <FormHelperText className={this.state.stateRequired}>
                  <span className="red">required</span>
                </FormHelperText>
              </FormControl><br/><br/>
              <FormControl>
                <InputLabel htmlFor="zipcode">Zipcode*</InputLabel>
                <Input id="zipcode" type="tel" value={this.state.zipcode} onChange={this.zipcodeChangeHandler}/>
                <FormHelperText className={this.state.zipcodeRequired}>
                  <span className="red">{this.state.zipcodeErrorMsg}</span>
                </FormHelperText>
              </FormControl>
            </div>
          </TabContainer>
        }
      </div>
    )
  }

  getPaymentStep = () => {
    return(
      <div>
        <FormControl component="fieldset" className={this.props.classes.formControl}>
          <FormLabel component="legend">Select mode of Payment</FormLabel>
          <RadioGroup
            aria-label="Gender"
            name="gender1"
            className={this.props.classes.group}
            value={this.state.paymentMode}
            onChange={this.handlePaymentChange}>
            {this.state.paymentModeList.map(mode => (
              <FormControlLabel value={mode.id.toString()} control={<Radio />} label={mode.paymentName} />
            ))}
            {/* <FormControlLabel value="cash_on_delivery" control={<Radio />} label="Cash on Delivery" />
            <FormControlLabel value="wallet" control={<Radio />} label="Wallet" />
            <FormControlLabel value="net_banking" control={<Radio />} label="Net Banking" />
            <FormControlLabel value="debit_credit_card" control={<Radio />} label="Debit / Credit card" /> */}
          </RadioGroup>
        </FormControl>
      </div>
    )
  }

  handlePaymentChange = (e) => {
    console.log(e.target.value);
    this.setState({
      paymentMode:e.target.value
    })
  }

  flatNoChangeHandler = (e) => {
    this.setState({
      flatNo:e.target.value
    })
  }

  localityChangeHandler = (e) => {
    this.setState({
      locality:e.target.value
    })
  }

  cityChangeHandler = (e) => {
    this.setState({
      city:e.target.value
    })
  }

  stateChangeHandler = (e) => {
    this.setState({
      state:e.target.value
    })
  }

  zipcodeChangeHandler = (e) => {
    this.setState({
      zpcode:e.target.value
    })
  }

  addressClickHandler = (address)=>{
    console.log('address', address);
    this.setState({
      currentAddressId:address.id,
      currentAddress:address
    })
  }
  handleChange = (event, value) => {
    this.setState({value: value});
  }

  handleNext = () => {
    if (this.state.activeStep === 0) {

    }
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  render(){
    const {classes} = this.props;
    let that = this;
    return(
      <div style={{marginTop:100}}>
        <Header
          screen="Checkout"/>
        <div style={{padding:10,display:'flex',flexDirection:'row', justifyContent:'space-between',alignItems:'center'}}>
          <Stepper style={{width:'70%'}}activeStep = {this.state.activeStep} orientation="vertical">
            {this.getSteps().map((label,index)=>{
              return(
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                  <StepContent>
                    {this.state.activeStep === 0 && this.getDeliveryStep()}
                    {this.state.activeStep === 1 && this.getPaymentStep()}
                    <div className={classes.actionsContainer}>
                      <div>
                        <Button
                          disabled={this.state.activeStep === 0}
                          onClick={this.handleBack}
                          className={classes.button}>
                          Back
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={this.handleNext}
                          className={classes.button}>
                          {this.state.activeStep === that.getSteps().length - 1 ? 'Finish' : 'Next'}
                        </Button>
                      </div>
                    </div>
                  </StepContent>
                </Step>
              )
            })}
          </Stepper>
          <Card style={{width: '30%',padding:10,display:'flex',flexDirection:'column'}}>
            <CardContent>
              <Typography variant="h5" gutterBottom style={{fontWeight:'bold'}}> Summary </Typography>
              {/* items in cart */}
              {this.cartItemsList.length > 0 && this.cartItemsList.map(cartItem =>
                <div key={cartItem.id}>
                  <CartItem item={cartItem} this={this} />
                </div>
              )}
              <Divider style={{marginTop:10}}/>
              <div style={{display:"inline-block", width:"100%", paddingTop:"3%"}}>
                <div style={{float:"left"}}><Typography variant="body1" gutterBottom style={{fontWeight:'bold'}}> TOTAL AMOUNT </Typography></div>
                <div style={{float:"right", width: "14%",display:'flex',alignItems:'center'}}>
                  <FontAwesomeIcon size="sm" icon="rupee-sign" color="black"/>
                  <span style={{color:"black"}}> {this.state.cartTotalPrice.toFixed(2)} </span>
                </div>
              </div>
            </CardContent>
            <CardActions>
              <div style={{width:"100%"}}>
                <Button style={{width:"100%"}} variant="contained" color="primary" onClick={this.placeOrderHandler}> PLACE ORDER </Button>
              </div>
            </CardActions>
          </Card>
        </div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.isSnackVisible}
          onClose={this.hideSnackBar}
          autoHideDuration={5000}
          message={<span>Order<Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={this.state.isSnackVisible}
            onClose={this.hideSnackBar}
            autoHideDuration={5000}
            message={<span>{this.state.snackMsg}</span>}/></span>}/>
      </div>
    )
  }

  showSncakBar = () => {
    this.setState({
      isSnackVisible:true,
    });
  }

  hideSnackBar = () =>{
    this.setState({
      isSnackVisible:false
    });
  }

  componentDidMount(){
    this.getAllPermanentAdressesApiCall();
    this.getStatesApiCall();
    this.getPaymentModeApiCall();
  }

  getAllPermanentAdressesApiCall = () => {
    let that = this;
    let url = `http://localhost:8080/api/address/user`;
    return fetch(url,{
      method:'GET',
      headers:{
        'accessToken':sessionStorage.getItem('accessToken')
      }
    }).then((response) =>{
      if (response.ok) {
        return response.json();
      }
    }).then((responseJson)=>{
      console.log('response json', responseJson);
      that.setState({
        addressList : responseJson
      });
    }).catch((error) => {
      console.log('error login data',error);
    });
  }

  getStatesApiCall = () => {
    let that = this;
    let url = `http://localhost:8080/api/states`;
    return fetch(url,{
      method:'GET',
    }).then((response) =>{
      if (response.ok) {
        return response.json();
      }
    }).then((responseJson)=>{
      console.log('response json', responseJson);
      that.setState({
        states : responseJson
      });
    }).catch((error) => {
      console.log('error login data',error);
    });
  }

  getPaymentModeApiCall = () => {
    let that = this;
    let url = `http://localhost:8080/api/payment`;
    return fetch(url,{
      method:'GET',
      headers:{
        'accessToken':sessionStorage.getItem('accessToken')
      }
    }).then((response) =>{
      if (response.ok) {
        return response.json();
      }
    }).then((responseJson)=>{
      console.log('response json', responseJson);
      that.setState({
        paymentModeList : responseJson
      });
    }).catch((error) => {
      console.log('error login data',error);
    });
  }

  placeOrderHandler = () => {
    let that = this;
    let amout = parseFloat(this.state.cartTotalPrice).toFixed(2);
    let url = `http://localhost:8080/api/order?&bill=${amout}&addressId=${this.state.currentAddress.id}&
      flatBuilNo=${this.state.currentAddress.flatBuilNo}&
      locality=${this.state.currentAddress.locality}&
      city=${this.state.currentAddress.city}&
      zipcode=${this.state.currentAddress.zipcode}&
      stateId=${this.state.currentAddress.states.id}&
      type=perm&paymentId=${this.state.paymentMode}`

    let body = this.cartItemsList.map(item => {
      var obj = {};
      obj['itemId'] = item.item.id;
      obj['quantity'] = item.quantity;
      return obj
    })
    return fetch(url,{
      method:'POST',
      headers:{
        'accessToken':sessionStorage.getItem('accessToken'),
        'content-type': 'application/json'
      },
      body:JSON.stringify(body)
    }).then((response) =>{
      if (response.ok) {
        that.orderPlaced();
        return response.text();
      }
    }).then((tex)=>{
      that.setState({
        snackMsg:"Order placed successfully! Your order id"+tex,
      })
    }).catch((error) => {
      console.log('error login data',error);
    });
  }

  orderPlaced = () => {
    this.showSncakBar();
  }
}

function CartItem(props) {
  console.log(props);
  const cartItem = props.item;
  const tag = cartItem.item.type === "Non-Veg" ? <FontAwesomeIcon icon="stop-circle" color="red"/> : <FontAwesomeIcon icon="stop-circle" color="green"/>;
  return (
    <div style={{display:"flex", justifyContent:"space-between",alignItems:"center",flexDirection:"row", width:"100%", padding:"1%"}}>
      {tag}
      <div style={{display:"flex", alignSelf:"flex-start", textTransform:"capitalize"}}><span style={{color:"grey"}}> {cartItem.item.itemName} </span></div>
      <div style={{display:"flex", alignItems:"center", textTransform:"capitalize"}}>
        <FontAwesomeIcon size="xs" icon="rupee-sign" color="grey"/>
        <span style={{color:"grey"}}> {cartItem.quantity} </span>
      </div>
      <div style={{display:"flex", alignSelf:"flex-end"}}><i class="fa fa-inr" aria-hidden="true"><span style={{color:"grey"}}> {cartItem.item.price.toFixed(2)} </span></i></div>
    </div>
  )
}

export default withStyles(styles)(Checkout);
