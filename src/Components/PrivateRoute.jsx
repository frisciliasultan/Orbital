import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PrivateRouteTemp = ({ component: Component, auth, userInfo, type, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if( auth.isAuthenticated === true ) {
        if((!auth.loading && userInfo.major) || type === "settings") {
          return <Component {...props} />
        } else if(!auth.loading && !userInfo.faculty) {
          return <Redirect to="/settings/academics" />
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
  userInfo: state.settings.userInfo
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