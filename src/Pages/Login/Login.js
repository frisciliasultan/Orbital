import React, { useState, useEffect, useReducer } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import isEmpty from "is-empty";
import classnames from "classnames";
import Facebook from "./Facebook";
import Google from "./Google";


const Login = (props) => {
  
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      email: "",
      password: "",
      errors: {}
    }
  );
  
  useEffect(() => {
    // If logged in and not first time registering and initial setup (current AY, userInfo) done, 
    // if user navigates to Login page, should redirect them to module planner
    if(props.auth.isAuthenticated && !props.auth.firstTimeRegistered ) {
      props.history.push("/module-planner");
    }
  }, [props.auth.isAuthenticated]);

  useEffect(() => {
    if (props.errors.login) {
      setUserInput({errors: props.errors.login})
    }
  }, [props.errors.login]);

  const onChange = e => {
    const { id, value } = e.target; 
    setUserInput({[id]: value});
  };

  const onSubmit = e => {
    e.preventDefault();
    const userData = {
          email: userInput.email,
          password: userInput.password
        };  
    props.loginUser(userData, false, false, props.history); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
  };

  const { errors } = userInput;

  return (
      <form noValidate onSubmit={onSubmit}>
          <h1>Sign in</h1>
          <div className="social-container">
              {/* <Facebook source="login"/>
              <Google source="login"/> */}
              {/* <a href="#" class="social"><i class="fab fa-instagram"></i></a> */}
          </div>
          <span>or use your account</span>

          <input
            onChange={onChange}
            value={userInput.email}
            error={errors.email}
            id="email"
            type="email"
            placeholder="Email"
            className={classnames("", {
              invalid: errors.email || errors.emailnotfound
            })}
          />
          <span style={{color: "red"}}>
            {errors.email}
            {errors.emailnotfound}
          </span>

          <input
            onChange={onChange}
            value={userInput.password}
            error={errors.password}
            id="password"
            type="password"
            placeholder="Password"
            className={classnames("", {
              invalid: errors.password || errors.passwordincorrect
            })}
          />
          <span style={{color: "red"}}>
            {errors.password}
            {errors.passwordincorrect}
          </span>

          {/* <a href="#">Forgot your password?</a> */}
          <button type="submit">Sign In</button>
      </form>
  );
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  settings: state.settings
});

export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(Login));