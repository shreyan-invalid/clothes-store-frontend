import React, { useState, useEffect } from 'react';
import { db } from "../../firebase";
import './Orders.css';
import { useStateValue } from "../../StateProvider";
import Order from '../Order/Order';
import Hero from '../Hero/Hero';
import Banner from '../Banner/Banner';
import {Link} from 'react-router-dom';
import axios from 'axios';
import apiSecretKey from '../../config';
import moment from 'moment';
const stripeApi= require('stripe')(apiSecretKey);



function Orders() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);
  const [mmt, setmmt]= useState(1);

  useEffect(() => {

    
    if(user) {
        
        setmmt(1);
        db
        .collection('users')
        .doc(user?.email)
        .collection('orders')
        .orderBy('timestamp', 'desc')
        .onSnapshot(snapshot => (
            setOrders(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            }))) 
        ))
        
        if(!orders.length> 0){
            setmmt(2);
        }

        
        
        
    } else {
        setOrders([])
        setmmt(2);
    }

  }, [user])

    if(orders.length=== 0 && mmt===1) {return (
        <div className='orders'>
            <h1>YOUR ORDERS</h1>
            
            
                <div className='orders__order'>
                <Hero >
                    <Banner title="Loading"
                        subtitle="Please wait for a while!"
                    >
                        <Link to="/clothes" className="btn-primary">Take me to the store</Link>
                    </Banner>
                </Hero>
                </div>
        </div>
    )
    }else if(orders.length===0 && mmt===2){
        return(
            <div className='orders__order'>

                
                <Hero >
                        <Banner title="You did not place any order yet!"
                            subtitle="Place your orders now!"
                        >
                            <Link to="/clothes" className="btn-primary">Take me to the store</Link>
                        </Banner>
                    </Hero>

            
            </div>
                
            
        
        )
    }else if(orders.length> 0){
        return(
            <div className='orders'>
            <h1>YOUR ORDERS</h1>
            
            
                <div className='orders__order'>
            <div className='orders__order'>
                { orders?.map(order => (
                    <Order order={order} />
                ))}
            </div>
            </div>
            </div>
        )
    }
        
    
}

export default Orders

