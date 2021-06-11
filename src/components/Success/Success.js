import './Success.css';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Hero from '../Hero/Hero';
import Banner from '../Banner/Banner';
import React from 'react'
import {Link} from 'react-router-dom';

function Success() {

    function returnComponent(Component){
        return (
            <Component/>
        )
    }
    return (
        <div className="success">
            
                <Hero>
                    
                    <Banner title={`Your order has been confirmed `}
                            subtitle="We are glad you shopped with us!"
                        >
                            
                            <Link to="/orders" className="btn-primary">Take me to my orders</Link><br/><br/>
                            <Link to="/clothes" className="btn-primary">Take me to the store</Link>
                    </Banner>
                
                </Hero>

        </div>
    )
}

export default Success
