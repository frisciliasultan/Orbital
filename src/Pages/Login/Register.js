import React, { useReducer, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser, loginUser } from "../../actions/authActions";
import classnames from "classnames";
import Facebook from "./Facebook";
import Google from "./Google";

const Register = (props) => {

  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
          name: "",
          email: "",
          password: "",
          password2: "",
          errors: {}
    }
  );
  
  useEffect(() => {
    if (props.errors.register) {
      setUserInput({errors: props.errors.register})
    }
  }, [props.errors.register]);

  useEffect(() => {
    if(props.auth.firstTimeRegistered) {
      if(!props.auth.isAuthenticated) {
        const userData = {
          email: userInput.email,
          password: userInput.password
        };  
        props.loginUser(userData, true, false, props.history)
      } 
       else {
        props.history.push('/academics-settings');
      }
    }
  }, [props.auth.firstTimeRegistered, props.auth.isAuthenticated])

    const onChange = e => {
      const { id, value } = e.target; 
      setUserInput({[id]: value});
    };


    const onSubmit = e => {
      e.preventDefault();
      const newUser = {
        name: userInput.name,
        email: userInput.email,
        password: userInput.password,
        password2: userInput.password2
        }; 
        props.registerUser(newUser, false, props.history); 
    };



      const { errors } = userInput;
        return (
            <form noValidate onSubmit={onSubmit}>
                <h1>Create Account</h1>
                <div className="social-container">
                  {/* <Facebook source="register"/>
                  <Google source="register"/> */}
                  {/* <a href="#" class="social"><i class="fab fa-instagram"></i></a> */}
                </div>
                <span>or use your email for registration</span>
                
                <input
                  onChange={onChange}
                  value={userInput.name}
                  error={errors.name}
                  id="name"
                  type="text"
                  placeholder="Name"
                  className={classnames("", {
                    invalid: errors.name
                  })}
                />
                <span style={{color: "red"}}>{errors.name}</span>
                
                <input
                  onChange={onChange}
                  value={userInput.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  placeholder="Email"
                  className={classnames("", {
                    invalid: errors.email
                  })}
                />
                <span style={{color: "red"}}>{errors.email}</span>

                <input
                  onChange={onChange}
                  value={userInput.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  placeholder="Password"
                  className={classnames("", {
                    invalid: errors.password
                  })}
                />
                <span style={{color: "red"}}>{errors.password}</span>

                <input
                  onChange={onChange}
                  value={userInput.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                  placeholder="Confirm Password"
                  className={classnames("", {
                    invalid: errors.password2
                  })}
                />
                <span style={{color: "red"}}>{errors.password2}</span>

                <button type="submit" >Sign Up</button>
            </form>
       );
    
}

Register.propTypes = {
  loginUser: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser, loginUser }
)(withRouter(Register));