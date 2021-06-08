import "./SignUp.css";

import React, {useState} from 'react'
import {Link, useHistory} from "react-router-dom";
import {auth} from '../../firebase';
import {useStateValue} from "../../StateProvider";
import Hero from '../Hero/Hero';
import Banner from '../Banner/Banner';


function SignUp() {

    const [{user}, dispatch]= useStateValue();
    
    const history= useHistory();
    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");
    const [confirmPassword, setconfirmPassword]= useState("");
    const [displayName, setdisplayName]= useState("");

    const register = e => {
        e.preventDefault();

        if(password===confirmPassword){
            auth.createUserWithEmailAndPassword(email, password)
            .then(auth => {

                if(auth){
                    history.push("/");
                    
                }

                
                
            })
            .catch(error => alert(error.message));

        }else if(password !== confirmPassword){
            alert("Please recheck your password again!");
        }
        
    }

    if(!user){
        return (
            <div className="signup">
                <Link to="/" className="signup__logo"><h2>Shreyan's Store</h2></Link>
    
                <div className="signup__container">
                    <form>
                    <h5>Name</h5>
                    <input type="text" value={displayName} onChange={e => setdisplayName(e.target.value)} />
                    <h5>Email</h5>
                    <input type="text"  value={email} onChange={e => setEmail(e.target.value)} />
                    <h5>Password</h5>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                    <h5>Confirm-Password</h5>
                    <input type="password" value={confirmPassword} onChange={e => setconfirmPassword(e.target.value)}/>
                    </form>
    
                    <button type="submit" className="login__registerButton" onClick={register}>Create My Account!</button>
                </div>
            </div>
        )
    }else{
        return(
            <div className="signup">
            <Hero >
            <Banner title="Already Signed In!"
                subtitle="Looks like you are already signed in!"
            >
                <Link to="/clothes" className="btn-primary">Take me to the store</Link>
            </Banner>
        </Hero>
        </div>
        )
    }
    
}

export default SignUp
