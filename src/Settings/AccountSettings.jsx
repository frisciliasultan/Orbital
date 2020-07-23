import React, { useState, useReducer, useEffect } from "react";
import SideNav from "./SideNav";
import { Input, Popconfirm, notification, message, Modal, Button, Spin } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Card } from "react-bootstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import RegistrationForm from "./ChangePassword";
import { deleteUser } from "../actions/authActions";
import { setEditAll, updateSettings } from "../actions/settingsActions";
import { removeSuccess } from "../actions/successActions";
import { handleSaveClick, checkSubmission } from "../utils/commonFunctions";
import isEmpty from "is-empty";
import LoadingDots from "../Pages/Loading Page/LoadingDots";
import { LoadingOutlined } from '@ant-design/icons';

const AccountSettings = (props) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    // const [changePassword, setChangePassword] = useState(false);

    const [userInput, setUserInput] = useReducer(
        (state, newState) => ({...state, ...newState}), 
        {
          username: props.auth.user.name,
          email: props.auth.user.email,
        }
      );
      const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    useEffect(() => {
    feedback();
    }, [props.success])

    function confirm(e) {
        console.log(e);
        message.success('Account successfully deleted');
        message.config({
            top: '70px',
            duration: 2
        })
        props.deleteUser();
    }
    
    const openNotification = (type, placement) => {
        notification[type]({
          message: type === "success" ? "Success!" : "Whoops!",
          description:
            type === "success" ? props.success : "Please fill in your particulars before saving!",
          placement,
        });
      };

    const presentButton = () => {
          if(!props.isEditing[2]) {
            return <button 
              className="button settings-button" 
              onClick={() => props.setEditAll(true, props.isEditing, 2)}>
                  Edit Username
            </button>
          } else {
            return (
                <>
                <div>
                  <button 
                   className="button settings-button" 
                   onClick={handleSubmit}>
                      Save Username
                  </button>
                  <Spin indicator={antIcon} spinning={props.settings.isLoading}/>
                </div>

                <button
                    className="button settings-button"
                    onClick={() => props.setEditAll(false, props.isEditing, 2)}>
                    Cancel
                </button>
                </>
              )
          }
      }
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value)
        setUserInput({[name]: value})
    }

    const handleSubmit = () => {
        const userData = {
            name: userInput.username,
            email: userInput.email,
          }
      
        //if all props of userData is filled, allow user to save
        //else alert popup to redirect user back to filling in their data (TEMPORARY)
        if(checkSubmission(userData)) {
            handleSaveClick(props, userData, 2);
        } else {
            openNotification('warning', 'bottomRight');
        }
    } 


    const renderContent = (name) => {
        if(props.isEditing[2]) {
            if(name === "username") {
                return (
                    <Input 
                         placeholder="Enter username"
                         type="text"
                         value={userInput.username}
                         name={name}
                         onChange={(e) => handleChange(e)}
                        //  onPressEnter={(e) => handleChange(e)}
                        //  onFocusOut={(e) => handleChange(e)}
                         prefix={<UserOutlined />}/>) 
            } else {
                return userInput[name];
                // return (
                //     <Input 
                //          placeholder={`Enter ${name}`}
                //          type="email"
                //          value={userInput.email}
                //          name={name}/>) 
            }
                
        } else {
            return userInput[name];
        }
    }
    
    const handleOk = () => {
      //what happens when updating password
      setIsModalVisible(false);
    };
    
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const feedback = () => {
        if(!isEmpty(props.success)) {
         openNotification('success', "bottomRight" );
           setTimeout(props.removeSuccess, 500) &&
           clearTimeout(setTimeout(props.removeSuccess, 2000))
        } 
     }

    return (
        <div className="settings">
            <SideNav active="account" major={props.settings.userInfo.major}/>
                <div className="acad-settings">
                <Card className="container" id="degree-settings">
                    <Card.Header>
                        Account Settings
                    </Card.Header>
                    <table className="table settings-table table-hover " id="degree-acad-table">
                        <tbody>
                            <tr>
                                <td>
                                    Username
                                </td>

                                <td>
                                    {renderContent("username")}
                                </td>
                            </tr>

                            {!props.auth.socialLogin && (<tr>
                                <td>
                                    <label>Email</label>
                                </td>

                                <td>
                                    {renderContent("email")}
                                </td>
                            </tr>)}
                        </tbody>
                    </table>
                  
                    {presentButton()}
                    {/* {!isModalVisible && 
                        <button 
                            className="button settings-button" 
                            onClick={() => setIsModalVisible(true)}>
                                Change Password
                        </button>}
                    
                        <Modal
                            visible={isModalVisible}
                            title="Change Password"
                            onOk={handleOk}
                            onCancel={handleCancel}
                            footer={[
                                null
                                // <Button key="back" onClick={handleCancel}>
                                // Return
                                // </Button>,
                                // <Button key="submit" type="primary" loading={props.auth.isLoading} onClick={handleOk}>
                                // Save
                                // </Button>,
                            //     <Form.Item {...tailFormItemLayout}>
                            //     <Button type="primary" htmlType="submit">
                            //       Submit
                            //     </Button>
                            //   </Form.Item>
                            ]}
                        >
                             <RegistrationForm 
                                    setIsModalVisible={setIsModalVisible}/>
                        </Modal>                             */}

                        
                        <Popconfirm
                            title="Confirm delete account?"
                            onConfirm={confirm}
                            okText="Yes"
                            cancelText="No"
                        >
                            <button 
                                className="button settings-button" id="delete">
                                    Delete account
                            </button>
                            <Spin indicator={antIcon} spinning={props.auth.loading}/>

                        </Popconfirm>
                </Card>
                </div>
        </div>
    )
}

AccountSettings.propType = {
    deleteUser: PropTypes.func.isRequired,
    removeSuccess: PropTypes.func.isRequired,
    setEditAll: PropTypes.func.isRequired,
    updateSettings: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    isEditing: PropTypes.object.isRequired,
    success: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired,
    modplan: PropTypes.object.isRequired,
    cap: PropTypes.object.isRequired
};

const mapStateToProp = state => ({
    auth: state.auth,
    settings: state.settings,
    isEditing: state.settings.isEditing,
    success: state.success,
    modplan: state.modplan,
    cap: state.cap
});

export default connect(mapStateToProp, { deleteUser, setEditAll, removeSuccess, updateSettings }) (AccountSettings);