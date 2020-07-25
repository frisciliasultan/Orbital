import React from "react"; 
import { Link } from "react-router-dom";
import { message } from "antd";
import { isSettingsEditing } from "../utils/commonFunctions";


const SideNav = (props) => {
  
  const warning = () => {
    if(!props.major || (isSettingsEditing(props.isEditing))) {
        message.warning({
            content: 'Please fill in your particulars!',
        })

        message.config({
            maxCount: 1,
            duration: .7,
            top: '70px',
        })
    }
  };
    return (
          <div className="sidenav">
            <h1>Settings</h1>
              
              {/* <Link 
                to="./profile" 
                className="navlink"
                id={props.active === 'profile' ? props.active : undefined}>
                <i className="fas fa-user fa-fw"/>
                Profile
              </Link> */}
              
              <Link 
                to="/academics-settings" 
                className="navlink"
                onClick={() => {
                  if(props.isEditing[2]) {
                      warning();
                  }}} 
                id={props.active === 'academics' ? props.active : undefined}>
                <i className="fas fa-graduation-cap fa-fw"/>
                Academics
              </Link>
  
              
              <Link 
                to="/account-settings" 
                className="navlink"
                onClick={() => {
                  if(!props.isEditing[2]) {
                      warning();
                  }}} 
                id={props.active === 'account' ? props.active : undefined}>
                <i className="fas fa-cog fa-fw"/>
                Account
              </Link>
          </div>
    )
}

export default SideNav;