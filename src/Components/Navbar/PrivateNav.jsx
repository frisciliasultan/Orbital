import React from "react";
import logoImg from "../../textLogo.svg";
import { Navbar, Nav } from "react-bootstrap"
import NavIcon from "../NavIcon";
import { Link } from "react-router-dom";
import { logoutUser } from "../../actions/authActions";
import { setEditAll } from '../../actions/settingsActions';
import { connect} from "react-redux"
import { message, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { isSettingsEditing } from '../../utils/commonFunctions';
import isEmpty from 'is-empty';

const { confirm } = Modal;

class PrivateNav extends React.Component {
    
    warning = () => {
        if(!this.props.settings.userInfo.major) {
            message.warning({
                content: 'Please fill in your particulars!',
            })
        } 
        message.config({
            maxCount: 1,
            duration: .7,
            top: '70px',
        })
      };
    
    handleClick = () => {
        this.warning();
        if(!isEmpty(this.props.settings.isEditing)){
            this.props.setEditAll(false, {}, 'editAll')
        }
    }

    handleLogoutClick = () => {
        const logout = this.props.logoutUser;
        confirm({
            title: 'Do you really wish to quit ModTree?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                logout();
            }
        });
    }
      
    render() {
        return (
            <div data-test="privateNavBarComponent">
                <Navbar className="navbar" expand="xl" sticky="top">
                    <Link to="/module-planner" onClick={this.handleClick} className="navbrand">
                        <Navbar.Brand>
                            <img
                            alt=""
                            src={logoImg}
                            width="150"
                            height="30"
                            className="d-inline-block align-top"
                            />{' '}
                        </Navbar.Brand>
                    </Link>
                    
                    
                    {/* <Link to="/select-modules" onClick={this.handleClick} className="navlink">
                            Module Information
                    </Link> */}

                    <Link to="/module-planner" onClick={this.handleClick} className="navlink">
                        Module Planner
                    </Link>

                    <Link to="/cap-calculator" onClick={this.handleClick} className="navlink">
                        CAP Calculator
                    </Link>

                    {/* <Link to="/dashboard" className="navlink">
                        Dashboard
                    </Link> */}

                        {/* <NavIcon icon={this.props.userProfilePicture} /> */}
                        {/* <NavIcon icon={logoImg} /> */}
                    <Link to="/academics-settings" 
                        onClick={() => {
                            if(this.props.settings.isEditing[2]) {
                                this.warning();
                            }}} 
                        className="navlink">
                        Settings
                    </Link>

                    <span className="navlink" id="logout" onClick={this.handleLogoutClick}>
                        Log Out
                    </span>
                </Navbar>
            </div>                    
        )
   }
}

const mapStateToProps = state => ({
    settings: state.settings
})
export default connect(mapStateToProps, { logoutUser, setEditAll })(PrivateNav);