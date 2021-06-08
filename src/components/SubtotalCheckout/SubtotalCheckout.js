import React,{useEffect, useState} from "react";
import "./SubtotalCheckout.css";
import CurrencyFormat from "react-currency-format";
import {useStateValue} from '../../StateProvider';
import { getBasketTotal } from "../../Reducer";
import { useHistory, Link } from "react-router-dom";
import {useStripe} from '@stripe/react-stripe-js';
import axios from "axios";
import { PostAdd } from "@material-ui/icons";
import {fetchFromAPI} from '../config';



function SubtotalCheckout() {
  const history = useHistory();
  const [{ basket, user }, dispatch] = useStateValue();
  const [message, setMessage] = useState("");

  const stripe= useStripe();

  const handleCheckout= async (e) => {
    e.preventDefault();
    

    const response = await fetchFromAPI('create-checkout-session', {
      body: {line_items: basket, customer_email: user.email},
    });

    const { sessionId }= response;
    const { error }= await stripe.redirectToCheckout({
      sessionId: sessionId
    });

    if(error){
      console.log(error);
    }
  }
  
  const handleCheckout2= async(e) => {
    e.preventDefault();

    const checkoutSession= await axios.post('http://localhost:4000/create-checkout-session', {
      line_items: basket,
      customer_email: user.email
    })

    const result= await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id
    })

    if(result.error) alert(result.error.message);
  };

  


  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              {/* Part of the homework */}
              Subtotal ({basket.length} items): <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" /> This order contains a promo code
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)} // Part of the homework
        displayType={"text"}
        thousandSeparator={true}
        prefix={"₹"}
      />

        <button onClick={handleCheckout2}  role="link" className="subtotal__button">Proceed to Checkout</button>
    </div>
  );
}

export default SubtotalCheckout;
