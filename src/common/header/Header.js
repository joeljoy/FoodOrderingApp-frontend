import React, {Component} from 'react';
import './Header.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {withStyles} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';
import FastFoodIcon from '@material-ui/icons/Fastfood';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import Modal from 'react-modal';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Snackbar from '@material-ui/core/Snackbar';
import InputAdornment from '@material-ui/core/InputAdornment';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

const TabContainer = function(props) {
  return (<Typography component="div" style={{
      padding: 0,
      textAlign: 'center'
    }}>
    {props.children}
  </Typography>)
}

const styles = theme => ({
  tabContainer:{
    display:'flex',
    flexDirection:'column',
  },
  toolbar: {
    display:'flex',
    [theme.breakpoints.down('xs')]:{
      flexDirection:'column',
      justifyContent:'space-between',
      alignItems:'flex-start',
    },
    [theme.breakpoints.down('sm')]:{
      flexDirection:'column',
      justifyContent:'space-between',
      alignItems:'flex-start',
    },
    [theme.breakpoints.up('md')]:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
    },
    [theme.breakpoints.up('lg')]:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
    },
    [theme.breakpoints.up('xl')]:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
    },
  },
  search: {
    position: 'relative',
    borderRadius: '4px',
    backgroundColor: '#263238',
    marginLeft: 0,
    width:null
  },
  inputInput: {
    color:'#ffffff',
    width:220
  },
  icon: {
    fontSize:20,
    marginRight:10
  },
  iconBig:{
    fontSize:30,
    marginRight:10,
    color:'white'
  },
  appHeader:{
    backgroundColor:'#263238'
  },
  button: {
    height:30
  },
  customUnderline:{
    '&:before':{
      borderBottom:'1px solid black'
    },
    '&:after':{
      borderBottom:'2px solid white'
    }
  },
})

class Header extends Component{

  constructor(props){
    super(props);
    this.state = {
      anchorEl: null,
      isOpenModel: false,
      value: 0,
      username: "",
      usernameTintVisible: "dispNone",
      password: "",
      passwordTintVisisble: "dispNone",
      firstname: "",
      firstnameRequired: "dispNone",
      lastname: "",
      lastnameRequired: "dispNone",
      email: "",
      emailRequired: "dispNone",
      emailErrorMsg:"",
      registerPassword: "",
      registerPasswordRequired: "dispNone",
      registerPasswordErrorMsg:"",
      contact: "",
      contactRequired: "dispNone",
      contactErrorMsg:"",
      signupFailMsg:"",
      signupFailMsgRequired:"dispNone",
      isSnackVisible:false,
      snackMsg:"",
      loginFailMsgRequired:"dispNone",
      loginFailMsg:"",
      userNameErrorMsg:"",
      name:"",
      typing:false,
      typingTimeout:0
    };
  }

  showModal = () =>{
    this.setState({isOpenModel: true});
  }

  closeModel = () => {
    this.setState({isOpenModel: false, usernameTintVisible: "dispNone", passwordTintVisisble: "dispNone", value: 0});
  }

  handleChange = (event, value) => {
    this.setState({value: value});
  }

  loginClickHandler = () => {
    let validated = true;

    if (this.state.username === "") {
      this.setState({
        userNameErrorMsg:"required",
        usernameTintVisible: "dispBlock"
      })
      validated = false;
    }else {
      if (!this.validateContactNo(this.state.username)) {
        this.setState({
          userNameErrorMsg:"Invalid Contact",
          usernameTintVisible: "dispBlock"
        })
        validated = false;;
      }else {
        this.setState({usernameTintVisible: "dispNone"})
      }
    }

    if (this.state.password === "") {
      this.setState({passwordTintVisisble: "dispBlock"})
      validated = false;;
    }else {
      this.setState({passwordTintVisisble: "dispNone"})
    }
    if (validated) {
      this.doLoginApiCall();
    }
  }

  doLoginApiCall = () =>{
    let that = this;
    let username = this.state.username;
    let password = this.state.password;
    let url = `http://localhost:8080/api/user/login?contactNumber=${username}&password=${password}`;
    return fetch(url,{
      method:'POST',
    }).then((response) =>{
      // console.log('response', response);
      if (response.ok) {
        sessionStorage.setItem("accessToken",response.headers.get("access-token"));
        return response.json();
      }else {
        that.loginFail();
      }
      return response.text();
    }).then((msg)=>{
      // console.log('message',msg);
      that.loginSuccess(msg)
      that.setState({
        loginFailMsg:msg
      });
    }).catch((error) => {
      console.log('error login data',error);
    });
  }

  loginSuccess = (response) =>{
    this.closeModel();
    this.showSncakBar();
    this.setState({
      snackMsg:"Logged in successfully!",
      loginFailMsgRequired:"dispNone"
    })
    sessionStorage.setItem("loggedIn", true);
    sessionStorage.setItem("username",response.firstName);
  }

  loginFail = () => {
    this.setState({
      loginFailMsgRequired:"dispBlock"
    })
  }

  usernameChangeHandler = (e) => {
    this.setState({
      username: e.target.value,
      usernameTintVisible: "dispNone"
    });
  }

  passwordChangeHandler = (e) => {
    this.setState({
      password: e.target.value,
      passwordTintVisisble:"dispNone"
    });
  }

  firstnameChangeHandler = (e) => {
    this.setState({
      firstname: e.target.value,
      firstnameRequired:"dispNone"
    });
  }

  lastnameChangeHandler = (e) => {
    this.setState({
      lastname: e.target.value,
      lastnameRequired:"dispNone"
    });
  }

  emailChangeHandler = (e) => {
    this.setState({
      email: e.target.value,
      emailRequired:"dispNone"
    });
  }

  registerPasswordChangeHandler = (e) => {
    this.setState({
      registerPassword: e.target.value,
      registerPasswordRequired:"dispNone"
    });
  }

  contactChangeHandler = (e) => {
    this.setState({
      contact: e.target.value,
      contactRequired:"dispNone"
    });
  }

  registerClickHandler = () => {
    let validated = true;
    if (this.state.firstname === "") {
      this.setState({firstnameRequired: "dispBlock"});
      validated = false;
    }else {
      this.setState({firstnameRequired: "dispNone"})
    }

    if (this.state.email === "") {
      this.setState({
        emailRequired: "dispBlock",
        emailErrorMsg:"required"
      })
      validated = false;
    }else {
      if (!this.validateEmail(this.state.email)) {
        this.setState({
          emailRequired:"dispBlock",
          emailErrorMsg:"Invalid Email"
        })
        validated = false;
      }else {
        this.setState({emailRequired: "dispNone"})
      }
    }

    if (this.state.registerPassword === "") {
      this.setState({
        registerPasswordRequired: "dispBlock",
        registerPasswordErrorMsg:"required"
      })
      validated = false;
    }else {
      if (!this.validatePassword(this.state.registerPassword)) {
        this.setState({
          registerPasswordRequired: "dispBlock",
          registerPasswordErrorMsg:"Password must contain at least one capital letter, one small letter, one number, and one special character"
        })
        validated = false;
      }else {
        this.setState({registerPasswordRequired: "dispNone"})
      }
    }

    if (this.state.contact === "") {
      this.setState({
        contactRequired: "dispBlock",
        contactErrorMsg:"required"
      })
      validated = false;
    }else {
      if (!this.validateContactNo(this.state.contact)) {
        this.setState({
          contactRequired: "dispBlock",
          contactErrorMsg:"Contact No. must contain only numbers and must be 10 digits long"
        })
        validated = false;
      }else {
        this.setState({
          contactRequired: "dispNone"
        })
      }
    }
    if (validated) {
      this.doRegisterApiCall();
    }
  }

  doRegisterApiCall = () => {
    let that = this;
    let firstName = this.state.firstname;
    let lastname = this.state.lastname;
    let email = this.state.email;
    let contactNumber = this.state.contact;
    let password = this.state.registerPassword;
    let url = `http://localhost:8080/api/user/signup?firstName=${firstName}&lastName=${lastname}&email=${email}&contactNumber=${contactNumber}&password=${password}`;
    return fetch(url,{
      method:'POST',
    }).then((response) =>{
      // console.log('response', response);
      // return response.text();
      if (response.ok) {
        that.signUpSuccess();
      }else {
        that.signUpFail();
      }
      return response.text();
    }).then((msg)=>{
      that.setState({
        signupFailMsg:msg
      });
    }).catch((error) => {
      console.log('error register data',error);
    });
  }

  signUpSuccess = () => {
    this.setState({
      value:0,
      signupFailMsgRequired:"dispNone",
      snackMsg:"Registered successfully! Please login now!"
    });
    this.showSncakBar();
  }

  signUpFail = () => {
    this.setState({
      signupFailMsgRequired:"dispBlock"
    });
  }

  validateEmail = (email) => {
    var re = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    return re.test(email);
  }

  validatePassword = (password) => {
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return re.test(password);
  }

  validateContactNo = (number) => {
    var re = /^\d{10}$/;
    return re.test(number);
  }

  //Using timeout to fire the api when user stops typing
  onSearchEntered = (e) => {
    let that = this;
    if (this.state.typingTimeout) {
      clearTimeout(this.state.typingTimeout);
    }

    this.setState({
      name:e.target.value,
      typing:false,
      typingTimeout:setTimeout(function(){
        that.props.searchHandler(that.state.name);
      },500)
    })
  }

  render(){
    const {classes} = this.props;
    let isUserLoggedIn = sessionStorage.getItem("loggedIn");
    return (
        <div>
          <AppBar className={classes.appHeader}>
            <Toolbar className={classes.toolbar}>
              <FastFoodIcon/>
              <div className={classes.search}>
                <Input
                  id="input-with-icon-adornment"
                  classes={{input: classes.inputInput, underline:classes.customUnderline}}
                  placeholder="Search by Restaurant Name"
                  onChange={this.onSearchEntered}
                  startAdornment={
                    <InputAdornment position="start">
                      <SearchIcon style={{color:"white"}}/>
                    </InputAdornment>
                  }
                />
              </div>
              {!isUserLoggedIn &&
                <Button variant="contained" className={classes.button} color="default" onClick={this.showModal}>
                  <AccountCircle className={classes.icon}/>
                  Login
                </Button>
              }
              {isUserLoggedIn &&
                <div>
                  <IconButton onClick={this.handleClick}>
                    <AccountCircle className={classes.iconBig}/>
                    <span style={{color:"white",fontSize:14}}>{sessionStorage.getItem("username")}</span>
                  </IconButton>
                  <Popover
                    id="simple-menu"
                    anchorEl={this.state.anchorEl}
                    open={Boolean(this.state.anchorEl)}
                    onClose={this.handleClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}>
                      <div style={{padding:'5px'}}>
                        <MenuItem onClick={this.handleAccount}>My Account</MenuItem>
                        <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                      </div>
                  </Popover>
                </div>
              }
              <Modal isOpen={this.state.isOpenModel} onRequestClose={this.closeModel} ariaHideApp={false} contentLabel="login" shouldCloseOnOverlayClick={false} style={customStyles}>
                <Tabs className="tabs" value={this.state.value} onChange={this.handleChange}>
                  <Tab label="Login"/>
                  <Tab label="Signup"/>
                </Tabs>
                {
                  this.state.value === 0 &&
                  <TabContainer>
                    <div className={classes.tabContainer}>
                      <FormControl>
                        <InputLabel htmlFor="username">Contact No. *</InputLabel>
                        <Input id="username" type="text" username={this.state.username} onChange={this.usernameChangeHandler}/>
                        <FormHelperText className={this.state.usernameTintVisible}>
                          <span className="red">{this.state.userNameErrorMsg}</span>
                        </FormHelperText>
                      </FormControl><br/><br/>
                      <FormControl>
                        <InputLabel htmlFor="password">Password *</InputLabel>
                        <Input id="password" type="password" password={this.state.password} onChange={this.passwordChangeHandler}/>
                        <FormHelperText className={this.state.passwordTintVisisble}>
                          <span className="red">required</span>
                        </FormHelperText>
                      </FormControl><br/><br/>
                      <Button onClick={this.loginClickHandler} variant="contained" color="primary">Login</Button>
                      <div className={this.state.loginFailMsgRequired}><span className="red">{this.state.loginFailMsg}</span></div>
                      </div>
                    </TabContainer>
                }
                {
                  this.state.value === 1 &&
                  <TabContainer className={classes.tabContainer}>
                    <div className={classes.tabContainer}>
                      <FormControl>
                        <InputLabel htmlFor="firstname">First Name*</InputLabel>
                        <Input id="firstname" type="text" username={this.state.firstname} onChange={this.firstnameChangeHandler}/>
                        <FormHelperText className={this.state.firstnameRequired}>
                          <span className="red">required</span>
                        </FormHelperText>
                      </FormControl><br/><br/>
                      <FormControl>
                        <InputLabel htmlFor="Lastname">Last Name</InputLabel>
                        <Input id="lastname" type="text" username={this.state.lastname} onChange={this.lastnameChangeHandler}/>
                        <FormHelperText className={this.state.lastnameRequired}>
                          <span className="red">required</span>
                        </FormHelperText>
                      </FormControl><br/><br/>
                      <FormControl>
                        <InputLabel htmlFor="email">Email*</InputLabel>
                        <Input id="email" type="email" username={this.state.email} onChange={this.emailChangeHandler}/>
                        <FormHelperText className={this.state.emailRequired}>
                          <span className="red">{this.state.emailErrorMsg}</span>
                        </FormHelperText>
                      </FormControl><br/><br/>
                      <FormControl>
                        <InputLabel htmlFor="register_password">Password*</InputLabel>
                        <Input id="register_password" type="password" username={this.state.registerPassword} onChange={this.registerPasswordChangeHandler}/>
                        <FormHelperText className={this.state.registerPasswordRequired}>
                          <span className="red">{this.state.registerPasswordErrorMsg}</span>
                        </FormHelperText>
                      </FormControl><br/><br/>
                      <FormControl>
                        <InputLabel htmlFor="contact">Contact*</InputLabel>
                        <Input id="contact" type="tel" username={this.state.contact} onChange={this.contactChangeHandler}/>
                        <FormHelperText className={this.state.contactRequired}>
                          <span className="red">{this.state.contactErrorMsg}</span>
                        </FormHelperText>
                      </FormControl><br/><br/>
                      <Button onClick={this.registerClickHandler} variant="contained" color="primary">Signup</Button>
                      <div className={this.state.signupFailMsgRequired}><span className="red">{this.state.signupFailMsg}</span></div>
                    </div>
                    </TabContainer>
                }
              </Modal>
          </Toolbar>
        </AppBar>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.isSnackVisible}
          onClose={this.hideSnackBar}
          autoHideDuration={5000}
          message={<span>{this.state.snackMsg}</span>}/>
    </div>)
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

  handleClick = (event) =>{
    this.setState({
      anchorEl: event.currentTarget
    })
  }

  handleAccount = ()=>{
    this.props.handleAccount();
    this.handleClose();
  }

  handleLogout = ()=>{
    // this.doLogoutApiCall();
    sessionStorage.clear();
    this.handleClose();
  }

  // doLogoutApiCall = () => {
  //   let that = this;
  //   let username = this.state.username;
  //   let password = this.state.password;
  //   let url = `http://localhost:8080/api/user/login?contactNumber=${username}&password=${password}`;
  //   return fetch(url,{
  //     method:'POST',
  //   }).then((response) =>{
  //     if (response.ok) {
  //       sessionStorage.setItem("accessToken",response.headers.get("access-token"));
  //       return response.json();
  //     }else {
  //       that.loginFail();
  //     }
  //     return response.text();
  //   }).then((msg)=>{
  //     that.loginSuccess(msg)
  //     that.setState({
  //       loginFailMsg:msg
  //     });
  //   }).catch((error) => {
  //     console.log('error login data',error);
  //   });
  // }

  handleClose = () =>{
    this.setState({ anchorEl: null });
  }
}

export default withStyles(styles)(Header)
