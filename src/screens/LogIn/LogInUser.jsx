import React, { Component } from 'react'
import InputUser from '../../commons/InputUser'
import ButtonLogIn from '../../commons/ButtonLogIn';
import Logo from '../../commons/Logo';
import { Link } from 'react-router-dom';
import PopUpCos from '../../commons/PopUpCos';
import Menu from '../Menu';
import FacebookLogIn from './FacebookLogIn';
import LoginWGoggle from './LoginWGoggle';




class LogInUser extends Component {

  constructor(props) {
    super(props)

    this.state = {

      username: "",
      email: "",

      user_password: "",
      appUser_id:'',

      errorMessage: "",
      user_skinType: "",

    }
  }

  handleChangeByFacebookOrGoogle = ( email , username) => {
    this.setState({
     
      username,
      email
      
    })

    this.checkSocialMedia()
   
  }



  handlechange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,

    })
  }

  checkLogIn = (e) => {
    console.clear();
 

    const apiUrl = 'http://localhost:58031/api/LogIn/User';

    const Logincheck = {
      username: this.state.username,
      user_password: this.state.user_password,
      
    };

    fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify(Logincheck),
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': 'application/json; charset=UTF-8',
      })
    })
      .then(res => {
        console.log('res=', res);
        console.log('res.status', res.status);
        console.log('res.ok', res.ok);
        
        return res.json()

      })
      .then(
        (result) => {
          
          console.log("fetch POST= ", result);
          console.log(result);
          console.log(result.user_skinType)
          if (result === "username or password were not found") {
            this.setState({ errorMessage: result });
            
          }
          else {
            
            this.setState({ errorMessage: "" });
            localStorage.setItem("appUser_id", result.appUser_id);
            localStorage.setItem("user_skinType",result.user_skinType);
            localStorage.setItem("user_route",result.user_route);
            localStorage.setItem('cosmetologist_id',result.cosmetologist_id);
            localStorage.setItem("type", 0);
            window.location.href = '/userhomepage'
          }


          console.log(this.state);

        },
        (error) => {
          console.log("err post=", error);


        });

    console.log('END');
  }

  checkSocialMedia = (e) => {
    console.clear();
    

    const apiUrl = 'http://localhost:58031/api/LogIn/User/SocialMedia';

    const Logincheck = {
      username: this.state.username,
      email: this.state.email,
      
    };

    fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify(Logincheck),
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': 'application/json; charset=UTF-8',
      })
    })
      .then(res => {
        console.log('res=', res);
        console.log('res.status', res.status);
        console.log('res.ok', res.ok);
        
        return res.json()

      })
      .then(
        (result) => {
          
          console.log("fetch POST= ", result);
          console.log(result);
          console.log(result.user_skinType)
          if (result === "username or password were not found") {
            this.setState({ errorMessage: result });
          }
          else {
            
            this.setState({ errorMessage: "" });
            localStorage.setItem("appUser_id", result.appUser_id);
            localStorage.setItem("user_skinType",result.user_skinType);
            localStorage.setItem("type", 0);
            window.location.href = '/userhomepage'
          }


          console.log(this.state);

        },
        (error) => {
          console.log("err post=", error);


        });

    console.log('END');
  }



  render() {

    return (

      <div>
        <Logo />

        <br></br><br></br>
        <h2 style={{ color: "black" }}>כניסת משתמשים</h2>
        <br></br>
        <InputUser value={this.username} name="username" type="text" label="שם משתמש" placeholder="שם משתמש" onChange={(e) => { this.setState({ username: e.target.value }) }} />

        <InputUser value={this.user_password} name="user_password" type="password" label="סיסמה" placeholder="סיסמה" onChange={(e) => { this.setState({ user_password: e.target.value }) }} />


        <button
          style={{ margin: 30, backgroundColor: "black", color: "white", fontSize: 15, width: '80%', height: 40, borderColor: "#e8e8e8", borderWidth: 1, borderRadius: 50 }} onClick={this.checkLogIn} >התחבר

        </button>

        {this.state.errorMessage &&
          <h3 style={{ color: 'red', fontSize: 14, marginTop: 0 }}> {this.state.errorMessage} </h3>}


        <Link to="/forgot">
          <button style={{ backgroundColor: '#f8fbff', border: 'none', color: 'black', textDecorationLine: 'underline' }}  > שכחתי סיסמה</button>
        </Link>
        <div style={{ margin: 50}}>
          <Link to="/chooseuser">
            <button style={{ fontSize: 20, backgroundColor: '#f8fbff', border: 'none', color: '#bc8f8f', textDecorationLine: 'underline' }}  > הרשמה לאפליקציה</button><br/><br/>
          </Link>
         
        <div style={{marginTop:40}}>
          <Link to='/'>
          <h4 style={{color:'#bc8f8f'}}>חזרה למסך הכניסה</h4>
          </Link>
        </div>
        


        </div>
        <hr/> או <hr/> <br/>

        <FacebookLogIn  handleChange={this.handleChangeByFacebookOrGoogle}/> <br/>
  
        <LoginWGoggle handleChange={this.handleChangeByFacebookOrGoogle}/>

      </div>
    )
  }
}

export default LogInUser;