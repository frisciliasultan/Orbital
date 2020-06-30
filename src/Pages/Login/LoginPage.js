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
                        <h1>Welcome Back!</h1>
                        <p>To keep connected with us please login with your personal info</p>
                        <button class="ghost" id="signIn" onClick={this.handleSignInClick}>Sign In</button>
                    </div>
                    <div class="overlay-panel overlay-right">
                        <h1>Hello, Friend!</h1>
                        <p>Enter your personal details and start journey with us</p>
                        <button class="ghost" id="signUp" onClick={this.handleSignUpClick}>Sign Up</button>
                    </div>
                </div>
            </div> 
    
        </div>
        )
    }
   
}

