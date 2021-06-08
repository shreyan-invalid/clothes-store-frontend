import React, { Component, useState } from 'react';


import './NewHeader.css';
import MenuIcon from '@material-ui/icons/Menu';
import ClearIcon from '@material-ui/icons/Clear';
import {Link} from 'react-router-dom';
import {useStateValue} from '../../StateProvider';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import {auth} from '../../firebase';


const NewHeader = () =>{
    const [clicked, setClick]= useState(false);

    const handleClick = () => {
        setClick(!clicked);
    }

    const handleAuthentication= () => {
        if(user){
            auth.signOut();
        }
    }

    const [{user, basket}, dispatch]= useStateValue();


        return(
            <nav className="NavbarItems">
                <Link  to="/" className="navbar-logo">Shreyan's Store<i className="fab fa-react"></i></Link>
                <div className="menu-icon" onClick={handleClick}>
                    {clicked? <ClearIcon className="fa-bars"/> : <MenuIcon className="fa-bars"/>}
                </div>
                <ul className={clicked ? 'nav-menu active' : 'nav-menu'}>
                    

                        <li key={1}>
                            <Link  onClick={user && handleAuthentication }  to={!user && "login"} className="nav-links nav-login" >
                                <span className="nav-small">Hello! {user && user.email}</span> 
                                <span className="nav-big">{user? "Sign Out!": "Sign In"}</span>
                            </Link>
                        </li>

                        

                        {
                            !user && <li key={2}>
                            <Link onClick={handleClick} to="signup" className="nav-links nav-login" >
                                <span className="nav-small">Register</span>
                                <span className="nav-big">Now</span>
                            </Link>
                        </li>
                        }

                        <li key={3}>
                            <Link onClick={handleClick} to={user? "/orders": "/clothes"} className="nav-links nav-login" >
                                <span className="nav-small">{user? "Your": "Shop"}</span>
                                <span className="nav-big">{user? "Orders": "Here"}</span>
                            </Link>
                        </li>

                        <li className="basket" key={1}>
                            <Link onClick={handleClick} to="/checkout" className="nav-links nav-login basket" >
                                <ShoppingBasketIcon /><span className="nav-small">{basket.length}</span>
                                
                            </Link>
                            
                        </li>


                </ul>
                
            </nav>
        )
    
}

export default NewHeader;