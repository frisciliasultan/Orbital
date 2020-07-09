import React, { useState, useReducer } from "react";
import SideNav from "./SideNav";
import { Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Card } from "react-bootstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import RegistrationForm from "./ChangePassword";
import { deleteUser } from "../actions/authActions";

const AccountSettings = (props) => {
    const [isEditing, setIsEditing] = useState(false);
    const [changePassword, setChangePassword] = useState(false);

    const [userInput, setUserInput] = useReducer(
        (state, newState) => ({...state, ...newState}), 
        {
          username: props.auth.user.name,
          email: props.auth.user.email,
        }
      );

    const presentButton = () => {
          if(!isEditing) {
            return <button 
              className="button settings-button" 
              onClick={() => setIsEditing(true)}>
                  Edit Settings
            </button>
          } else {
            return <button 
              className="button settings-button" 
              onClick={() => {
                handleSubmit();
                setIsEditing(false);}}>
                Save Settings
            </button>
          }
      }
    
    const handleSubmit = () => {

    }

    const renderContent = (name) => {
        if(isEditing) {
            if(name === "username") {
                return (
                    <Input 
                         placeholder="Enter username"
                         type="text"
                         name={name}
                         prefix={<UserOutlined />}/>) 
            } else {
                return (
                    <Input 
                         placeholder={`Enter ${name}`}
                         type="email"
                         name={name}/>) 
            }
                
        } else {
            return userInput[name];
        }
    }
    return (
        <div className="settings">
            <SideNav active="account"/>
                <Card className="container" id="degree-settings">
                    <Card.Header>
                        Account Settings
                    </Card.Header>
                    <table className="table table-hover settings-table" id="degree-acad-table">
                        <tbody>
                            <tr>
                                <td>
                                    <label>Username :</label>
                                </td>

                                <td>
                                    {renderContent("username")}
                                </td>
                            </tr>

                            {!props.auth.socialLogin && (<tr>
                                <td>
                                    <label>Email :</label>
                                </td>

                                <td>
                                    {renderContent("email")}
                                </td>
                            </tr>)}

                            {changePassword && (<tr>
                                <td>
                                    <label>Changing Password</label>
                                </td>

                                <td>
                                <RegistrationForm 
                                    setChangePassword={setChangePassword}/>
                                </td>
                            </tr>)}
                        </tbody>
                    </table>
                  
                    {presentButton()}
                    {!changePassword && 
                        <button 
                            className="button settings-button" 
                            onClick={() => setChangePassword(true)}>
                                Change Password
                        </button>}

                    <button 
                        className="button settings-button" id="delete" 
                        onClick={props.deleteUser}>
                            Delete account
                    </button>
                </Card>
        </div>
    )
}

AccountSettings.propType = {
    deleteUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProp = state => ({
    auth: state.auth
});

export default connect(mapStateToProp, { deleteUser }) (AccountSettings);