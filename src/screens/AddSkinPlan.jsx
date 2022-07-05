import React, { Component } from 'react'
import InputUser from '../commons/InputUser';
import ButtonLogIn from '../commons/ButtonLogIn';
import CardAddProdToPlan from '../commons/CardAddProdToPlan';
import Logo from '../commons/Logo';
import UserInfo from '../commons/UserInfo';
import PopUpCos from '../commons/PopUpCos';
import FilterProducts from './FilterProducts';



let local = false;
//const apiUrl = 'https://proj.ruppin.ac.il/bgroup90/test2/tar1/api/';
const apiUrl = 'https://localhost:58031/api/cos';
//if (local) {
// apiUrl = 'https://localhost:44326/api/LogIn/register';
//}

class AddSkinPlan extends Component {

  constructor(props) {
    super(props)

    this.state = {
      plan_name: "",
      notes: "",
      products: [],
      filterProducts: [],
      ppp: [],
      user: JSON.parse(localStorage.getItem('user') ?? ''),
      users: [],
      user_status: "waiting",

    }
  }

  handlechange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  filterProduct = (type) => {
    debugger
    let arr = [...this.state.products]

    arr = arr.filter(x => x.prod_type == type)

    this.setState({ filterProducts: arr })
  }

  addProductToPlan = (item) => {
    debugger
    let arr = [...this.state.ppp]
    arr.push(item)
    this.setState({ ppp: arr })
  }

  deleteProductFromPlan = (item) => {
    let arr = [...this.state.ppp]
    debugger
    let product=arr.findIndex(x => x.prod_id==item.prod_id)
    arr.splice(product, 1)
    this.setState({ ppp: arr })
  }

  componentDidMount() {

    const apiUrl = 'http://localhost:58031/api/Products/status';

    fetch(apiUrl, {
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

          console.log("fetch btnFetchGetProducts= ", result);
          result.map(st => console.log(st.prod_id));
          console.log('result[0].prod_id', result[0].prod_id);
          this.setState({ products: [...result], filterProducts: [...result]}

          );

        },
        (error) => {
          console.log("err post=", error);
        })

  }


  addSkinPlan = (e) => {
    console.clear();
    e.preventDefault()

    const newskinplan = {
      plan_name: this.state.plan_name,
      notes: this.state.notes,
    };

    fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify(newskinplan),
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
          console.log(result.plan_name);
          console.log(this.state);
        },
        (error) => {
          console.log("err post=", error);
        });

    console.log('END');
  }




  /* //addprod = (e) => {

    const  apiUrl= 'http://localhost:58031/api/Cos/AddProdToPlan/${this.state.appUser_id}';

    console.clear();
    e.preventDefault()

    const prodtoplan = {
      prod_id: this.state.prod_id,
      plan_id: this.state.plan_id,
    };
    fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify(prodtoplan),
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': 'application/json; charset=UTF-8',
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
            console.log(result.prod_id);
            console.log(this.state);
          },
          (error) => {
            console.log("err post=", error);
          });
  
      console.log('END');
    }
  }

  filterproducts = (e) => {
    // filter products by type from list 
  }
*/

  render() {

    return (

      <div>

        <h4 style={{ marginTop: 35 }}>יצירת תוכנית טיפוח </h4>


        <div style={{ border: '1px solid black' }}>
          <h3 style={{ color: "#c4a092", fontSize: 15, textAlign: 'center' }} > פרטי משתמש </h3>
          <div >
            <UserInfo user={this.state.user} users={this.state.users} />
          </div>
        </div>

        <div style={{ border: '1px solid black' }}>
          <h3 style={{ color: "#c4a092", fontSize: 15, textAlign: 'center' }} > פרטי התוכנית </h3>
          <InputUser value={this.plan_name} name="plan_name" type="text" label=" שם התוכנית  " placeholder="שם התוכנית   " onChange={(e) => { this.setState({ plan_name: e.target.value }) }} />
          <InputUser value={this.notes} name="notes" type="text" label="  הערות   " placeholder="הערות   " onChange={(e) => { this.setState({ notes: e.target.value }) }} /><br />
          <ButtonLogIn style={{ backgroundColor: "#c4a092", color: "white", fontSize: 15, width: '60%', height: 30, borderColor: "#e8e8e8", borderWidth: 1, borderRadius: 50, margin: 10 }} name="שמירת פרטי תוכנית " onClick={this.addSkinPlan} />
        </div>


        <h3 style={{ margin: 30, color: "#c4a092", fontSize: 15, textAlign: 'center' }} >הוספת מוצרים </h3>
        <div>
          <FilterProducts filter={this.filterProduct} />
        </div>
        <div>
          {this.state.filterProducts.map((products) => <CardAddProdToPlan add={this.addProductToPlan} key={products.prod_id} products={products} />)}
        </div>

        <h3 style={{ color: "#c4a092", fontSize: 15, textAlign: 'center' }} > מוצרים שנוספו לתוכנית </h3>
        {this.state.ppp.map((product) => {
          return (<div>{product.prod_name}
          <button onClick={()=>this.deleteProductFromPlan(product)}>X</button></div>)
        })}

        <ButtonLogIn style={{ margin: 30, backgroundColor: "black", color: "white", fontSize: 15, width: '80%', height: 40, borderColor: "#e8e8e8", borderWidth: 1, borderRadius: 50 }} name="שמירה והוספת מוצרים " />

        {this.state.showPopup ?
          <PopUpCos
            header=' תוכנית טיפוח נוספה בהצלחה '
            text=' נבדוק את מספר העסק שלך ותוכלי להתחיל לטפל בלקוחות בעוד כ24 שעות'
            closePopup={this.togglePopup.bind(this)}
          />
          : null
        }

      </div>
    )
  }
}
export default AddSkinPlan;
