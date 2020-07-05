import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, { useEffect } from "react";
import { ModuleSelectionPage } from "./Pages/Module Selection Page/ModuleSelectionPage"
import { LoginPage } from './Pages/Login/LoginPage'
import "./login.css";
import {
  Switch,
  Route,
} from "react-router-dom";

import AboutPage from "./Pages/About Page/AboutPage";
import PrivateNav from './Components/Navbar/PrivateNav';
import { PublicNav } from './Components/Navbar/PublicNav';
import  ModulePlannerPageTemp  from "./Pages/Module Planner Page/ModulePlannerPage";
import  CAPCalculatorPage  from "./Pages/CAP Calculator Page/CAPCalculatorPage";
import AcadSettings from './Settings/AcadSettings';

import PrivateRoute from './Components/PrivateRoute';
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { initialSettings, setCurrentSemester } from "./actions/settingsActions";

import PrivateRouteTemp from "./Components/PrivateRoute";
import Dashboard from "./Components/dashboard/Dashboard";

import ServerError from './Pages/Error Page/ServerError';

import store from './store';
import { connect } from 'react-redux';

import axios from "axios";

let totalGEMMCs = 0;

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);

  // Decode token and get user info and exp
  const decoded = jwt_decode(token);

  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }

  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded, false));

  axios
        .get("http://172.19.162.53:3000/info/faculties")
        .then(res => {console.log(res); })

        axios
        .get("http://172.19.162.53:3000/info/residences")
        .then(res => {console.log(res); })
    

    // Set current AY and semester
    const time = new Date();
    const month = time.getMonth() + 1;
    const year = time.getFullYear();
    const isSem2 = (month <= 7);
    let currentSemester;
    let currentAY;

    if(isSem2) {
        currentAY = `${year - 1}/${year}`
        currentSemester = "Semester 2"
    } else {
        currentAY = `${year}/${year + 1}`
        currentSemester = "Semester 1"
    }
    store.dispatch(setCurrentSemester(currentAY, currentSemester, month));

    // Set user academic info 
    store.dispatch(initialSettings());

    
  
}

const App = (props) => {
  return (
    <div>
      <PrivateNav class="navbar" />
      {/* {props.isAuthenticated ? <PrivateNav class="navbar" /> : <PublicNav class="navbar" />} */}
    
      <Switch>
        <Route 
          exact path="/" 
          component={AboutPage} />

        <Route 
          exact path="/login" 
          component={LoginPage} />

        <PrivateRouteTemp 
          exact path="/dashboard" 
          component={Dashboard} />

        <PrivateRouteTemp 
            exact path="/select-modules" 
            component={ModuleSelectionPage} />

        <PrivateRouteTemp 
            exact path="/module-planner" 
            component={ModulePlannerPageTemp} />

        <PrivateRouteTemp 
            exact path="/cap-calculator" 
            component={CAPCalculatorPage} /> 

        <PrivateRouteTemp 
            exact path="/settings/academics" 
            type="settings"
            component={AcadSettings} /> 

        <Route 
          exact path="/500-error" 
          component={ServerError}/>

        <Route 
          component={() => <div className="display-2"><strong>404 NOT FOUND</strong></div>}/>
      </Switch>
    </div>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading
})

export default connect(mapStateToProps)(App);




