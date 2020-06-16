import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import { Spinner } from "react-bootstrap";


class Login extends React.Component {
    constructor() {
        super();
        this.state = {
          email: "",
          password: "",
          errors: {}
        };
      }
    
    componentDidMount() {
      // If logged in and user navigates to Login page, should redirect them to dashboard
      if (this.props.auth.isAuthenticated) {
        this.props.history.push("/dashboard");
      }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated && !nextProps.auth.firstTimeRegistered) {
          this.props.history.push("/dashboard"); // push user to dashboard when they login
        }

        if (nextProps.errors) {
              this.setState({
                errors: nextProps.errors
              });
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
      e.preventDefault();
      const userData = {
            email: this.state.email,
            password: this.state.password
          };  
      this.props.loginUser(userData, false); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
    };
    
    render(){
      const { errors } = this.state;
      return (
          <form noValidate onSubmit={this.onSubmit}>
              <h1>Sign in</h1>
              <div class="social-container">
                  <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
                  <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
                  <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
              </div>
              <span>or use your account</span>

              <input
                onChange={this.onChange}
                value={this.state.email}
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
                onChange={this.onChange}
                value={this.state.password}
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

              <a href="#">Forgot your password?</a>
              <button type="submit">Sign In</button>
              {this.props.auth.loading && <Spinner animation="border" variant="success" role="status" as="span"></Spinner>}
          </form>
      );
    }
    
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(Login));