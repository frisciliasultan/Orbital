import React from 'react';
import { GoogleLogin } from 'react-google-login'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import { registerUser } from "../../actions/authActions";



class Google extends React.Component {

    responseGoogle = response => {
        console.log(response);
        const userData = {
            network: 'google',
            token: response.tokenObj.id_token
        };

        if(!this.props.auth.isAuthenticated) {
          if(this.props.source === "login") {
            this.props.loginUser(userData, false, true);
          } else {
            this.props.loginUser(userData, true, true);
          }
        }
        
    };

    errorGoogle = () => { 
        this.props.history.push('./500-error');
    }

    render() {
        let googleContent = (<GoogleLogin
            clientId="55325972325-f4g43dqq9dt6b3n33ct320ibsir8e5e3.apps.googleusercontent.com"
            onSuccess={this.responseGoogle}
            onFailure={this.errorGoogle}
            cookiePolicy={'single_host_origin'}
            render={renderProps => (
                <i class="fab fa-google-plus-g" onClick={renderProps.onClick} disabled={renderProps.disabled}/>
                )}
            />);

        return <a>{googleContent}</a>;
    }
}

 Google.propTypes = {
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
)(Google);
