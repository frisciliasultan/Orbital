import React from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import { registerUser } from "../../actions/authActions";


 class Facebook extends React.Component {
    

    responseFacebook = response => {
        // console.log(response);
        const userData = {
            network: 'facebook',
            token: response.accessToken
        };
        
        if(!this.props.auth.isAuthenticated) {
          if(this.props.source === "login") {
            this.props.loginUser(userData, false, true);
          } else {
            this.props.loginUser(userData, true, true);
          }
        }
    };

    failureFacebook = () => {
        this.props.history.push('./500-error');
    }

     render() {
        let fbContent = (<FacebookLogin
            appId="258228452184257"
            fields="name, email, picture"
            callback={this.responseFacebook}
            onFailure={this.failureFacebook}
            render={renderProps => (
                <i class="fab fa-facebook-f" onClick={renderProps.onClick}/>
            )}
            />);
         
         return <a>{fbContent}</a>;
     }
 }
 
 Facebook.propTypes = {
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
)(Facebook);
