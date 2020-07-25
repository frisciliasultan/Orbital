import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import isEmpty from "is-empty";
import { isSettingsEditing } from '../utils/commonFunctions'

const PrivateRouteTemp = ({ component: Component, auth, userInfo, isEditing, type, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if( auth.isAuthenticated === true ) {
        if(((!auth.loading && userInfo.major && !isSettingsEditing(isEditing))) 
          || (type === "academics-settings" && !isEditing[2])
          || (type === "account-settings" && isEditing[2])) {
          return <Component {...props} />
        } else if(isEditing[2]) {
          return <Redirect to="/account-settings" />
        } else  {
          return <Redirect to="/academics-settings" />
        }
      } else {
        return <Redirect to="/login" />
      }
    }}/>
);

PrivateRouteTemp.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth, 
  userInfo: state.settings.userInfo,
  isEditing: state.settings.isEditing
});

export default connect(mapStateToProps)(PrivateRouteTemp);












// import React from 'react';
// import { Route, Redirect } from 'react-router-dom';
// import { connect } from "react-redux";
// import PropTypes from "prop-types";


// const PrivateRoute = ({ component: Component, auth, ...rest }) => (
//     <Route
//       {...rest}
//       render={props =>
//         auth.isAuthenticated === true ? (
//           <Component {...props} />
//         ) : (
//           <Redirect to="/login" />
//         )
//       }
//     />
//   );
//   PrivateRoute.propTypes = {
//     auth: PropTypes.object.isRequired
//   };
//   const mapStateToProps = state => ({
//     auth: state.auth
//   });
//   export default connect(mapStateToProps)(PrivateRoute);