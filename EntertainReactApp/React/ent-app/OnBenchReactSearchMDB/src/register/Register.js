import React, { useContext, useRef, useState } from 'react'
import './Register.css';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import { UserContext, UserProvider } from '../UserContext';
import Login from '../login/Login';
import Trending from '../Pages/Trending/Trending';

function Register() {
    const [email, setEmail] = useState("");
    const [ setPassword] = useState("");
    const history = useHistory();
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useContext(UserContext);
    const [name] = useState();
    const { user } = useContext(UserContext);
    const handleStart = () => {
        setEmail(emailRef.current.value);
        console.log("in reigister from cont "+name);
        console.log("in reigister before dis "+emailRef.current.value);
    }
    
    const handleFinish = async (e) => {
        console.log("password first "+ passwordRef.current.value)
        if (email != null && passwordRef.current.value !== "") {
            e.preventDefault();
            setPassword(passwordRef.current.value);
            console.log("password : " + passwordRef.current.value);
            const axiosPayLoad = await axios.post('http://localhost:8080/new'
                , {
                    "email": email,
                    "password": passwordRef.current.value
                }
            );
            const axiosData = axiosPayLoad.data;
            console.log("axiosdata: ", axiosData);
            if (
                (email != null && passwordRef.current.value != null
                    && email && passwordRef.current.value
                    && axiosData.password === passwordRef.current.value
                    ) 
            ) {
                login(email);
                console.log("***in reigister logg " + name);
                renderTrending();
                console.log("from routing " + email);
                console.log("after routing " + email);
            } else
            console.log("cannot read  ");
        }
        else { console.log("please enter username/pass")}
    }
   
    const handleLogin = () => {
        history.push("/login");
          return (
            <UserProvider >
            <Login />
        </UserProvider>
          );
    }
        
    const renderTrending = () => {
        history.push("/trending");
        return (
            <UserProvider >
                <Trending />
            </UserProvider>
        );
    }
    
    return (
        <div>
        <div className="register">
            <div className="container">
                <h1>Unlimited movies, TV shows, and more.</h1>
                <h2>Watch anywhere. Cancel anytime.</h2>
                <p>
                    Ready to watch? Enter your email to create account.
                    </p>
                    <button className="login__button"
                        onClick={handleLogin}>Login</button>
                {
                    !email ? (
                        <div className="input">
                            <input className="in" type="email" placeholder="email address" ref={emailRef} />
                                <button className="register__button"
                                    onClick={handleStart}>Get Started
                                </button>
                        </div>
                    ):(
                        <form className="input">
                            <input className="in" type="password" placeholder="password" ref={passwordRef} />
                            <button className="register__button"
                                    onClick={handleFinish}>Start
                            </button>
                        </form>
                    )
                }
            </div>
        </div>
    </div>
    )
}
export default Register;
