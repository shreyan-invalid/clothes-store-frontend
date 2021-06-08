import "./Login.css";

import {Link, useHistory} from 'react-router-dom';
import React, {useState} from 'react';
import { auth, provider } from "../../firebase";
import {useStateValue} from '../../StateProvider';


function Login() {

    const [{user}, dispatch]= useStateValue();
    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");
    const history= useHistory();

    const signInWithGoogle = e => {
        e.preventDefault();

        auth.signInWithPopup(provider).then((result)=>{
            history.push('/')
        })
        .catch(error => alert("Oops! We coudn't get you logged in. Please try again!"))
    }
    const signIn = e => {
        e.preventDefault();

        auth.signInWithEmailAndPassword(email, password)
        .then(auth => {
            history.push('/')
        })
        .catch(error => alert(error.message))
    }
    const register = e => {
        e.preventDefault();

        auth.createUserWithEmailAndPassword(email, password)
        .then(auth => {

            if(auth){
                history.push("/")
            }
            
        })
       
    }

    if(!user){return (
        <div className="login">
            <Link to="/" className="login__logo"><h2 >Shreyan's Store</h2></Link>
        
        <div className="login__container">

            <h3>Login here</h3>
            <form>
                <h5>Email</h5>
                <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
                <h5>Password</h5>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>

                <button type="submit" className="login__signInButton" onClick={signIn}>Sign In</button>
            </form>

            <button className="login__signInButton login__end" onClick={signInWithGoogle} >Sign in with google!</button>

            <Link to="signup"><button className="login__registerButton" >Create your own account!</button></Link>

        </div>

       
        </div>
    )
    }else{
        
        return(
            <>
                {   
                    history.push("/")
                }
            </>
        ) 

       
    }
}

export default Login;
