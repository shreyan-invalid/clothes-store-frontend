import "./Payment.css";

import React, {useState, useEffect} from 'react'
import {useStateValue} from '../../StateProvider';
import {Link, useHistory} from 'react-router-dom';
import CheckoutProduct from '../CheckoutProduct/CheckoutProduct';
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import { getBasketTotal } from "../../Reducer";
import CurrencyFormat from 'react-currency-format';
import axios from 'axios';
import {db} from "../../firebase";
import Banner from '../Banner/Banner';
import Hero from '../Hero/Hero';


function Payment() {
    
    
    const [{user, basket}, dispatch]= useStateValue();

    const history= useHistory();
    const stripe= useStripe();
    const elements= useElements();
    const [error, setError]= useState(null);
    const [disabled, setDisabled]= useState(true);
    const [succeeded, setSucceeded]= useState(false);
    const [processing, setProcessing]= useState(false);
    const [clientSecret, setClientSecret]= useState("");

    useEffect(() => {
        // generate the special stripe secret which allows us to charge a customer
        const getClientSecret = async () => {


            const response = await axios({
                method: 'post',
                // Stripe expects the total in a currencies subunits
                url: `http://localhost:5001/shreyan-s-store/us-central1/api/payments/create?total=${getBasketTotal(basket) * 100}`
            });

            
            
            response? console.log(response): console.log("no res");
            if(response!= null)setClientSecret(response.data.clientSecret);
            
        }

        getClientSecret();
    }, [basket])

    console.log("The secret is >>>", clientSecret);

    const handleSubmit = async (event) => {

        event.preventDefault();

        setProcessing(true);

        const payload= await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({paymentIntent}) => {

            console.log(paymentIntent);
            console.log("The user is", user);
            console.log(paymentIntent.id);
            console.log(paymentIntent.amount);
            console.log(paymentIntent.created);
            console.log(basket);
            // console.log(error.error.payment_intent.created);
            // const payment_intent= error.error.payment_intent;

            db.collection('users').doc(user?.uid).collection('orders').doc(paymentIntent.id).set({ 
                  basket: basket,
                  amount: paymentIntent.amount,
                  created: paymentIntent.created
              })

            setSucceeded(true);
            setError(null);
            setProcessing(false);

            dispatch({
                type: "EMPTY_BASKET"
            })
            
            history.replace("/orders");

            
        })
        // .catch(error=> {
        //     db.collection("users")
        //     .doc(user?.uid)
        //     .collection("orders")
        //     .doc(error.error.payment_intent.id)
        //     .set({
        //         basket: basket,
        //         amount: error.error.payment_intent.amount,
        //         created: error.error.payment_intent.created
        //     })
        // })
        
    }

    const handleChange = event => {
        setDisabled(event.empty);
        setError(event.error? event.error.message: "");
    }
    
    if(user) { return (
            <div className="payment">
                <div className="payment__container">
                    <Link to="/" className="payment__logo"><h3>Shreyan's Store</h3></Link>
                    <div className="payment__section">
                        <div className="payment__title">
                            <h3>Review Items ({basket.length})</h3>
                        </div>
                        <div className="payment__items">
                            {basket.length> 0? basket.map((item) => (
                                <CheckoutProduct
                                    id={item.id}
                                    title={item.title}
                                    image={item.image}
                                    price={item.price}
                                    rating={item.rating}
                                    hideButton={true}
                                    key={item.id}
                                />
                            )): 
                                <Hero hero="roomsHero"><Banner title="Your basket is Empty" subtitle="Head to our collections now!">
                                <Link to="/clothes" className="btn-primary">Take me to the store</Link>
                                </Banner>
                                </Hero>
                            }
                        </div>
                    </div>

                    <div className="payment__section">
                        <div className="payment__title">
                                <h3>Choose Payment Method</h3>
                        </div>

                        <div className="payment__details">
                                <form onSubmit={handleSubmit}>
                                    <CardElement onChange={handleChange}/>

                                    <div className="payment__priceContainer">
                                        <CurrencyFormat
                                                renderText={(value) => (
                                                <>
                                                    <h3>
                                                    {/* Part of the homework */}
                                                    Your order Total: <strong>{value}</strong>
                                                    </h3>
                                                    
                                                </>
                                                )}
                                                decimalScale={2}
                                                value={getBasketTotal(basket)} // Part of the homework
                                                displayType={"text"}
                                                thousandSeparator={true}
                                                prefix={"₹"}
                                        />
                                        <button disabled={processing || disabled || succeeded}>
                                            <span>
                                                {processing? <p>Processing</p> : "Buy now"}
                                            </span>
                                        </button>
                                    </div>

                                    {error && <div>{error}</div>}
                                </form>

                                
                        </div>
                    </div>
                </div>
            </div>
       
    
      )
    
        
    }else{
        return(
            <>
                {alert("Please log in First!")}
                {history.push('/login')}
            </>
        )
    }
}

export default Payment;
