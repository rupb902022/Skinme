import React, { Component } from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const MaslulInfo = (props) => {
  const [userRoute, setUserRoute] = useState('')
  let navigate = useNavigate()

  const saveMaslul = () => {
    const user_route = userRoute;
    localStorage.setItem('user_route', user_route);
    navigate('/maslul')
  }

    return (
      <div >
        <Link to='/userhomepage'>
          <img style={{ position: 'absolute', left: 5, top: 0 }} alt="wrinkles" height="100" width="100" src={require("../../assets/images/home2.png")} />
        </Link>
        <h4 style={{ marginTop: 35 }}>מסלולים</h4>  <hr />

        <h3 style={{ color: "gray", fontSize: 15, textAlign: 'center', marginTop: 50 }} > בחרי את המסלול המועדף עלייך </h3>

        <div className="card" style={{ width: '18rem', margin: 50, float: "left", border: '#c4a092 solid 2px' }} >
          <img className="card-img-top" src={require("../../assets/images/maslul1.png")} alt="maslulone" width="150" height="150"  ></img>
          <div className="card-body">
            <div> <p className="card-text" style={{ color: "black", fontSize: 15, textAlign: 'center' }} >  קוסמטיקאית תעריך את מצב העור שלך באופן אישי באמצעות האפליקציה החכמה שלנו, ותתאים עבורך את התכשירים בצורה מדויקת </p> </div>
            <div> <h3 className="card-text" style={{ color: "black", fontSize: 15, textAlign: 'center' }} > <img src={require("../../assets/images/shekel.png")} width="10" height="10" alt="edit" />  250</h3>
              <p className="card-text" style={{ color: "black", fontSize: 15, textAlign: 'center' }} > תשלום חד פעמי  </p>  </div>
            <input style={{ width: 20, height: 50 }} type='checkbox' name='user_route' value='1' onChange={(e)=>{setUserRoute(e.target.value)}}></input>

          </div>
        </div>

        <div className="card" style={{ width: '18rem', margin: 50, marginTop: 0, float: "left", border: '#c4a092 solid 2px' }} >
          <img className="card-img-top" src={require("../../assets/images/maslul2.png")} alt="maslultwo" width="150" height="150"  ></img>
          <div className="card-body">
            <div> <p className="card-text" style={{ color: "black", fontSize: 15, textAlign: 'center' }} >קוסמטיקאית תעריך את מצב העור שלך באופן אישי באמצעות האפליקציה החכמה שלנו, ותתאים עבורך את התכשירים בצורה מדויקת. <br /> ליווי אישי צמוד עם אפשרות ליצירת קשר ומעקב תמונות, כדי ששתיכן תישארו מעודכנות </p> </div>
            <div> <h3 className="card-text" style={{ color: "black", fontSize: 15, textAlign: 'center' }} > <img src={require("../../assets/images/shekel.png")} width="10" height="10" alt="edit" />  150</h3>
              <p className="card-text" style={{ color: "black", fontSize: 15, textAlign: 'center' }} >   תשלום חודשי קבוע </p>  </div>
            <input style={{ width: 20, height: 50 }} type='checkbox' name='user_route' value='2' onChange={(e)=>{setUserRoute(e.target.value)}}></input>

          </div>
        </div>

        <button style={{ margin: 30, backgroundColor: "#c4a092", color: "white", fontSize: 15, width: '80%', height: 40, borderColor: "#e8e8e8", borderWidth: 1, borderRadius: 50 }} onClick={saveMaslul} > הבא  </button>

      </div>

    )
  }


export default MaslulInfo;
