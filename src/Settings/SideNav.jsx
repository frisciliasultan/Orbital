import React from "react"; 
import { Link } from "react-router-dom";

const SideNav = (props) => {
    return (
          <div className="sidenav">
            <h1>Settings</h1>
              
              <Link 
                to="./profile" 
                className="navlink"
                id={props.active === 'profile' ? props.active : undefined}>
                <i className="fas fa-user fa-fw"/>
                Profile
              </Link>
              
              <Link 
                to="./academics" 
                className="navlink"
                id={props.active === 'academics' ? props.active : undefined}>
                <i className="fas fa-graduation-cap fa-fw"/>
                Academics
              </Link>
  
              
              <Link 
                to="./account" 
                className="navlink"
                id={props.active === 'account' ? props.active : undefined}>
                <i className="fas fa-cog fa-fw"/>
                Account
              </Link>
          </div>
    )
}

export default SideNav;