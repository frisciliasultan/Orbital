import React from "react";
import Login from './Login';
import Register from './Register';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import LoadingDots from "../Loading Page/LoadingDots";

const LoginPage = (props) => {
    const handleSignUpClick = () => {
        const container = document.getElementById('container');
        container.classList.add("right-panel-active");
   }

    const handleSignInClick = () => {
        const container = document.getElementById('container');
        container.classList.remove("right-panel-active");
   }

   return (
            props.loading 
            ? <LoadingDots/>
            : (
                <div className="container" id="container" data-test="loginPageComponent">
                    <div className="form-container sign-up-container">
                        <Register/>
                        
                    </div>

                    <div className="form-container sign-in-container">
                        <Login/>
                    </div>
                
                    <div className="overlay-container">
                        <div className="overlay">
                            <div className="overlay-panel overlay-left">
                                <h1>Have an account?</h1>
                                <p>Welcome back! Please sign in with your account below</p>
                                <button className="ghost" id="signIn" onClick={handleSignInClick}>Sign In</button>
                            </div>
                            <div className="overlay-panel overlay-right">
                                <h1>Don't have an account?</h1>
                                <p>Register and start your journey with us</p>
                                <button className="ghost" id="signUp" onClick={handleSignUpClick}>Sign Up</button>
                            </div>
                        </div>
                    </div> 
                </div>
            )
        )   
}

LoginPage.propTypes = {
    loading: PropTypes.bool.isRequired,
  };
  
const mapStateToProps = state => ({
loading: state.auth.loading
});

export default connect(mapStateToProps)(LoginPage)