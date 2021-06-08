import "./Checkout.css";
import {useStateValue} from '../../StateProvider';
import CheckoutProduct from '../CheckoutProduct/CheckoutProduct';

import SubtotalCheckout from '../SubtotalCheckout/SubtotalCheckout';
import FlipMove from 'react-flip-move';
import React, {useState, useEffect} from 'react';
import Banner from '../Banner/Banner';
import Hero from '../Hero/Hero';
import {Link} from 'react-router-dom'
import { Flip } from "@material-ui/icons";


function Checkout() {
    const [{basket}, dispatch]= useStateValue();
    const [number, setNumber]= useState(-1);

   

    
      const customEnterAnimation = {
            from: { transform: 'scale(0.5, 1)' },
            to:   { transform: 'scale(1, 1)' }
        };
        
    const customLeaveAnimation = {
        from: { transform: 'scale(1, 1)' },
        to:   { transform: 'scale(0.5, 1) translateY(-20px)' }
    };

    const getNumber= () => {
        setNumber(number+1);
        console.log(number);
    }

    return (
        <div className="checkout">
            
            <div className="checkout__left">
                <div>
                    <h2 className="checkout__title">
                        YOUR SHOPPING BASKET
                    </h2>
                    
                        
                        {basket.length> 0 ? basket.map((item) => (
                            
                            
                                <CheckoutProduct
                                key={getNumber}
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                                />
                           
                            
                        )): <div className="checkout__empty">
                            <Hero hero="roomsHero"><Banner title="Your basket is Empty" subtitle="Head to our collections now!">
                                <Link to="/clothes" className="btn-primary">Take me to the store</Link>
                            </Banner>
                            </Hero>
                            </div>}

                         
                    
                </div>
            </div>
             

            
            
            <div className="checkout__right">
                <SubtotalCheckout/>
            </div>
            
        </div>
    )
}

export default Checkout
