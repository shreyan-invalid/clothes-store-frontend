import "./Header.css";
import {Link} from 'react-router-dom';
import React, {useState} from 'react';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import SearchIcon from '@material-ui/icons/Search';
import {useStateValue} from '../../StateProvider';
import {auth} from '../../firebase';
import MenuIcon from '@material-ui/icons/Menu';
import ClearIcon from '@material-ui/icons/Clear';

function Header() {
    const [{basket, user}, dispatch]= useStateValue();

    const handleAuthentication= () => {
        if(user){
            auth.signOut();
        }
    }

    function click(){
        setClick(!clicked);
    }

    const [clicked, setClick]= useState(true);

    

    return (
        <div className="header">
            <Link to="/" className="header__logo"><h3>Shreyan's Store</h3></Link>

            <div className="header__search">
                <input className="header__searchInput" type="text"/>
                <SearchIcon className="header__searchIcon"/>
            </div>

            {
                    clicked? <i className="menu-icon"><MenuIcon classNamr="menu-icon" onClick={click}/></i> : <i className="menu-icon"><ClearIcon onClick={click}/></i>
            }
            <div className={clicked? "header__nav" : "header__dropdown"} >

                <Link className="header__option" to={!user && '/login'}>
                    <div onClick={handleAuthentication} className="header__option">
                        <span className="header__optionLineOne">Hello {!user? "there" : user.email}</span>
                        <span className="header__optionLineTwo">{user? "Sign Out": "Sign In"}</span>
                    </div>  
                </Link>
                

                {!user && <Link to="/signup" className="header__option">
                    <span className="header__optionLineOne">Register</span>
                    <span className="header__optionLineTwo">Here</span>
                </Link>}

                <Link to="/checkout" className="header__option">
                    <span className="header__optionLineOne">Your</span>
                    <span className="header__optionLineTwo">Orders</span>
                </Link>
                
                
               
                <div className="header__optionBasket">
                    <ShoppingBasketIcon />
                    <span className="header__rowTwo header__basketCount">
                        {basket?.length}
                    </span>
                </div>

                

            </div>
            
        </div>
    )
}

export default Header;
