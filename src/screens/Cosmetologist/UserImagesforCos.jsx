import React, { useState, useEffect } from 'react'
import { Card, CardActionArea, CardMedia } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function UserImagesforCos() {

  const [file, setFile] = useState();
  const [img, setImg] = useState({});
  const [userImages, setUserImages] = useState([])

  const id = localStorage.getItem('appUser_id')


  useEffect(()=>{
    async function fetchData(){
      let res = await fetch(`https://proj.ruppin.ac.il/bgroup90/prod/api/Users/allimages/${id}`, {
        method: 'GET', headers: new Headers({
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json; charset=UTF-8',
        })
      })
      let arr = await res.json();
      setUserImages(arr)
    }
    fetchData();
  })
 
 

  

 

  async function handleChange(e) {
    const file = e.target.files[0]
    const base64 = await convertToBase64(file)
    setFile(base64);
  }

  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        resolve(fileReader.result)
      }
      fileReader.onerror = (error) => {
        reject(error)
      }
    })

  }



  return (
    <div>
       <Link to='/coshomepage'>
          <img style={{ position: 'absolute', left: 5, top: 0 }} alt="wrinkles" height="100" width="100" src={require("../../assets/images/home2.png")} />
        </Link>
      <h4 style={{ marginTop: 35 }}>מעקב תמונות  </h4> <hr />

      <div style={{ backgroundColor: 'beige', margin: 10 }}>
        
      {userImages.map((item,index) => { 
        return <div key={index}>
         
          <img style={{ width: 200, height: 200,margin:20 }}  src={item.Imgurl} />  
          <h5 >{item.upload_date}</h5>
          </div>      
      })}

    
      </div>
      
    </div>
  )
}
export default UserImagesforCos;

