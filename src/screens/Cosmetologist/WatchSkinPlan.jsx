import React, { Component } from 'react'

import { Link } from 'react-router-dom';
import DayProductForCosPage from '../../commons/DayProductForCosPage';

import NightProductForCosPage from '../../commons/NightProductForCosPage';


class WatchSkinPlan extends Component {

    constructor(props) {
        super(props)

        this.state = {
            productsday: [],
            productsnight: [],
            user_skinType: localStorage.getItem('user_skinType'),
            plan_id: localStorage.getItem('plan_id'),
            appUser_id: localStorage.getItem('appUser_id'),
            user_route: localStorage.getItem('user_route'),
            products: [],
            user: "",


        }
    }

    ProductsDay() {
        const apiUrl = `https://proj.ruppin.ac.il/bgroup90/prod/api/Products/GetProdForAutoPlanDay/?id=${this.state.appUser_id}`;

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

                    console.log("fetch btnFetchGetcos= ", result);
                    result.map(st => console.log(st.plan_id));
                    console.log('result[0].prod_id', result[0].plan_id);
                    this.setState({ productsday: [...result] }

                    );

                },
                (error) => {
                    console.log("err post=", error);
                })

    }


    UserInfo() {
        const apiUrl = `https://proj.ruppin.ac.il/bgroup90/prod/api/Users/${this.state.appUser_id}`;

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

                    console.log("fetch btnFetchGetcos= ", result);
                    result.map(st => console.log(st.appUser_id));
                    console.log('result[0].prod_id', result[0].appUser_id);
                    this.setState({ user: result}

                    );

                },
                (error) => {
                    console.log("err post=", error);
                })

    }

    ProductsNight() {
        const apiUrl = `https://proj.ruppin.ac.il/bgroup90/prod/api/Products/GetProdForAutoPlanNight/?id=${this.state.appUser_id}`;

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

                    console.log("fetch btnFetchGetcos= ", result);
                    result.map(st => console.log(st.plan_id));
                    console.log('result[0].prod_id', result[0].plan_id);
                    this.setState({ productsnight: [...result] }

                    );

                },
                (error) => {
                    console.log("err post=", error);
                })

    }

    componentDidMount() {
        this.ProductsDay();
        this.ProductsNight();
        this.UserInfo();
    }


    render() {
        return (
            <div >
                <Link to='/coshomepage'>
                    <img style={{ position: 'absolute', left: 5, top: 0 }} alt="wrinkles" height="100" width="100" src={require("../../assets/images/home2.png")} />
                </Link>
                <h4 style={{ marginTop: 35 }}> ?????????? ?????????????? ?????????? </h4>
                <hr />
              
                <br/>
                <Link to='/userimagesforcos'>
              {this.state.user_route ==2 ? <button style={{ margin: 10,marginTop:40, backgroundColor: "black", color: "white", fontSize: 15, width: '70%', height: 30, borderColor: "black", borderWidth: 1, borderRadius: 50 }}  >???????? ????????????</button>:("")}
              </Link>

                <div style={{ marginTop: 10 }}>
                    <h2 style={{ color: '#FFAB00', backgroundColor: 'beige' }}>????????</h2>
                    {this.state.productsday.map((productsday) => <DayProductForCosPage key={productsday.prod_id} productsday={productsday} />)} <br />
                </div>

                <div style={{ marginTop: 600 }}>

                    <h2 style={{ color: '#607D8B', backgroundColor: 'beige' }}>??????</h2>
                    {this.state.productsnight.map((productsnight) => <NightProductForCosPage key={productsnight.prod_id} productsnight={productsnight} />)}
                </div>


            </div>
        )
    }
}


export default WatchSkinPlan;
