import React from 'react';
import InstagramLogin from 'react-instagram-login';
import { Redirect } from 'react-router-dom';


class Instagram extends React.Component {
   constructor(props) {
       super(props);
   
       this.state = {
           userID: '',
           name: '',
           email: '',
           picture: '',
       };
   }

   responseInstagram = response => {
       console.log(response);
       //this.props.updateLoginStatus(true);
   };

   errorInstagram = response => { 
        console.error(response)
        }

    render() {
        let instagramContent;
        const {from} = this.props.location || { from: { pathname: '/'}}

        if(this.props.isLoggedIn) {
           instagramContent = <Redirect to={from} />
        } else {
            
            instagramContent = (<InstagramLogin
              clientId="927830728167-j7pr2smu9kh840umahsm0smg4j8qcu8a.apps.googleusercontent.com"
              render={renderProps => (
                <i class="fab fa-instagram-i" onClick={renderProps.onClick} disabled={renderProps.disabled}/>
              )}
              onSuccess={this.responseInstagram}
              onFailure={this.errorInstagram}
              cookiePolicy={'single_host_origin'}
            />);
        }
        return <a>{instagramContent}</a>;
    }
}

export default Instagram;