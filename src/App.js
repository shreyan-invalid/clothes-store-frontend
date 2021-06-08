
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Store from './components/Store/Store';
import Checkout from './components/Checkout/Checkout';
import Login from './components/Login/Login';
import React, {useEffect} from 'react';
import {auth} from './firebase';
import {useStateValue} from './StateProvider';
import SignUp from './components/SignUp/SignUp';
import Payment from './components/Payment/Payment';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import Orders from './components/Orders/Orders';
import NewHeader from './components/NewHeader/NewHeader';
import Error from './components/Error/Error';



const promise= loadStripe("pk_test_51IZA6ISCZdMn9ZmYbJcEJFm8unsYqcEBSzFrZDmspmLEqYwy1t70uyQ9C2BUEeyExkbOv7DNRcWPJJnQRVMh7Va700QERsOJri");



function App() {

  const [{user, displayName}, dispatch]= useStateValue();

  useEffect(()=> {

    auth.onAuthStateChanged(authUser => {
      
      console.log(authUser);

      if(authUser) {
        
        dispatch({
          type: 'SET_USER',
          user: authUser,
        })
      }else{
        dispatch({
          type: "SET_USER",
          user: null,
        })

        dispatch({
          type: "SET_NAME",
          displayName: null
        })
      }
    })

  }, []);

  
  return (
    <div className="app">
      <Router>
        <Switch>
        <Route path="/orders">
        <NewHeader/>
            <Orders/>
          </Route>
          <Route path="/payment">
            <Elements stripe={promise}>
              <Payment/>
            </Elements>
          </Route>
          <Route path="/signup">
            <SignUp/>
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/clothes">
          <NewHeader/>
            <Store/>
          </Route>
          <Route path="/checkout">
          <NewHeader/>
          <Elements stripe={promise}>
            <Checkout/>
          </Elements>
          </Route>
          {/* <Route path="/">
            <Error/>
          </Route> */}
          <Route path='/'>
            <NewHeader/>
            <Home/>
          </Route>
          
        </Switch>
      </Router>
    </div>
  );
}

export default App;
