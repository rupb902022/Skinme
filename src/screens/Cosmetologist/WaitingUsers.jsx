
import UserCard from '../../commons/UserCard';
import React, { Component } from 'react'

import { Link } from 'react-router-dom';

class WaitingUsers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      user_status: "waiting",
      cosmetologist_id: localStorage.getItem('cosmetologist_id'),
      errorMessage:""

    }
  }

  componentDidMount = () => {
    console.clear();
    const apiUrl = `https://proj.ruppin.ac.il/bgroup90/prod/api/Cos/Depending/?id=${this.state.cosmetologist_id}`;

    const user_status = { user_status: this.state.user_status };

    fetch(apiUrl, {
      method: 'Post',
      body: JSON.stringify(user_status),
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
          result.map(st => console.log(st.appUser_id));
          console.log('result[0].user_id=', result[0].appUser_id);
          this.setState({ users: [...result] }
          );
         
        },
        (error) => {
          console.log("err post=", error);
        })
  }

 

  render() {
    return (
      <div >
        <Link to='/coshomepage'>
          <img style={{ position: 'absolute', left: 5, top: 0 }} alt="wrinkles" height="100" width="100" src={require("../../assets/images/home2.png")} />
        </Link>
        <h4 style={{ marginTop: 35 }}> משתמשים ממתינים לחוות דעת </h4>
        <hr/>

        <div >
        {this.state.users.length > 0 ? this.state.users.map((user) => <UserCard key={user.appUser_id} user={user} />):<h3 style={{marginTop:300,color:'gray'}}>אין משתמשים שממתינים לחוות דעת</h3>}
         

        </div>

      </div>
    )
  }
}

export default WaitingUsers;

