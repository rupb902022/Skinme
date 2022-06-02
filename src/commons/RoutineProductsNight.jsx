import React from 'react'
import ButtonLogIn from './ButtonLogIn'


const RoutineProductsNight = (props) => {
  const {productsnight} = props

   const showId =()=>{
     console.log(productsnight.prod_id)
   }

  return (
    <div className="card"  style={{ width:'7rem',margin:5,float:"left",border: '#B5651D solid 2px',borderRadius:10}} >
    <div className="card-body">
      <div>
          
          <h6 className="card-title" style={{color:"black",}}> {productsnight.prod_name}</h6>
          <h6 className="card-title" style={{color:"#B5651D",}}> {productsnight.prod_company} </h6>
          <ButtonLogIn  style={{margin:5,backgroundColor:"black",color:"white",fontSize:10,width:'60%',height:25,borderColor:"#e8e8e8" , borderWidth:1,borderRadius:50}} name="פירוט מוצר"/>
          
      </div>
    </div>
    </div>
    
   );
  }
   export default RoutineProductsNight;