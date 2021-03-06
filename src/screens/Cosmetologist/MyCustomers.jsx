import Logo from '../../commons/Logo';
import UserCard from '../../commons/UserCard';
import React, { Component } from 'react'
import ButtonLogIn from '../../commons/ButtonLogIn';
import { Link } from 'react-router-dom';
import MyUserCard from '../../commons/MyUserCard';

class MyCustomers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: [],
      cosmetologist_id: localStorage.getItem('cosmetologist_id'),
      errorMessage:""

    }
  }

  componentDidMount = () => {
    console.clear();

    const apiUrl = 'https://proj.ruppin.ac.il/bgroup90/prod/api/Cos/GetClients';
    const url=`${apiUrl}/${this.state.cosmetologist_id}`

  

    fetch(url, {
      method: 'GET',
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
          result.map(st => console.log(st.user_id));
          console.log('result[0].user_id=', result[0].user_id);
          
          this.setState({ user: [...result] }
          );

        },
        (error) => {
          console.log("err post=", error);
        })
  }

  /* function message(props) {
return <h2>אין לקוחות ממתינים</h2>
}

function greeting(props) {
const isEmpty = props.isEmpty;
if (isEmpty) {
return <message/>
}

} */


  render() {
    return (
      <div >
        <Link to='/coshomepage'>
          <img style={{ position: 'absolute', left: 5, top: 0 }} alt="wrinkles" height="100" width="100" src={require("../../assets/images/home2.png")} />
        </Link>
        <h4 style={{ marginTop: 35 }}> הלקוחות שלי </h4>   <hr/>

        
        {this.state.user.length > 0 ?this.state.user.map((user) => <MyUserCard key={user.appUser_id} user={user} />):<h3 style={{color:'gray', marginTop:300}}>אין לקוחות כעת</h3>}
          

      </div>
    )
  }
}

export default MyCustomers;

