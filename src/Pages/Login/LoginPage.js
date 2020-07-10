import React from "react";
import Login from './Login';
import Register from './Register';

export class LoginPage extends React.Component{
   constructor(props) {
       super(props);
       this.handleSignUpClick = this.handleSignUpClick.bind(this);
       this.handleSignInClick = this.handleSignInClick.bind(this);
   }

   handleSignUpClick() {
        const container = document.getElementById('container');
        container.classList.add("right-panel-active");
   }

   handleSignInClick() {
        const container = document.getElementById('container');
        container.classList.remove("right-panel-active");
   }

    render() {
        return(
            <div className="container" id="container">
            <div className="form-container sign-up-container">
                <Register/>
                
            </div>
    
            <div className="form-container sign-in-container">
                <Login/>
            </div>
           
            <div className="overlay-container">
                <div class="overlay">
                    <div class="overlay-panel overlay-left">
                        <h1>Have an account?</h1>
                        <p>Welcome back! Please sign in with your account below</p>
                        <button class="ghost" id="signIn" onClick={this.handleSignInClick}>Sign In</button>
                    </div>
                    <div class="overlay-panel overlay-right">
                        <h1>Don't have an account?</h1>
                        <p>Register and start your journey with us</p>
                        <button class="ghost" id="signUp" onClick={this.handleSignUpClick}>Sign Up</button>
                    </div>
                </div>
            </div> 
    
        </div>
        )
    }
   
}

