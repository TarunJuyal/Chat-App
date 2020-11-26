import React from 'react';
import "./Login.css"
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../actions/userActions";

const LoginPage = (props) => {
    const dispatch = useDispatch();
    const responseGoogle = (response) => {
         let dataToSubmit={
             name:response.profileObj.name,
             email:response.profileObj.email,
             image:response.profileObj.imageUrl,
             tokenExp:response.tokenObj.expires_at
         }
         console.log(dataToSubmit);
         dispatch(loginUser(dataToSubmit).then(response=>{
             if(response.payload.success){
                 props.history.push("/dashboard");
             }else{
                 alert("failed to login",response.payload);
             }
         }))
    }

    return ( 
        <div className="loginPage">
            <div className="loginBody">
                <img alt="Logo" src="https://i.pinimg.com/originals/87/ae/aa/87aeaab2713e5b36fc344b3b7c2b52b5.png"></img>
                <div className="loginText">
                    <h1>Sign in to ChatApp</h1>
                </div>
                <GoogleLogin 
                clientId="1001118546771-lpjr4kiua1qb3qlh3gdgjmddje7vg5b4.apps.googleusercontent.com" 
                buttonText="Sign In With Google" 
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}></GoogleLogin>
            </div>
        </div>
     );
}
 
export default LoginPage;