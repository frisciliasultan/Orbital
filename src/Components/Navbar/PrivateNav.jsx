import React from "react";
import logoImg from "../../textLogo.svg";
import { Navbar, Nav } from "react-bootstrap"
import NavIcon from "../NavIcon";
import { Link } from "react-router-dom";
import { logoutUser } from "../../actions/authActions";
import { connect} from "react-redux"
import { message } from 'antd';


class PrivateNav extends React.Component {
    warning = () => {
        if(!this.props.settings.userInfo.major) {
            
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
      
    render() {
        return (
            <Navbar className="navbar" expand="xl" sticky="top">
                <Link to="/module-planner" onClick={this.warning} className="navbrand">
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
                
                
                <Link to="/select-modules" onClick={this.warning} className="navlink">
                        Module Information
                </Link>

                <Link to="/module-planner" onClick={this.warning} className="navlink">
                    Module Planner
                </Link>

                <Link to="/cap-calculator" onClick={this.warning} className="navlink">
                    CAP Calculator
                </Link>

                {/* <Link to="/dashboard" className="navlink">
                    Dashboard
                </Link> */}

                    {/* <NavIcon icon={this.props.userProfilePicture} /> */}
                    {/* <NavIcon icon={logoImg} /> */}
                <Link to="/settings/profile" className="navlink">
                    Settings
                </Link>

                <span className="navlink" id="logout" onClick={() => this.props.logoutUser()}>
                    Log Out
                </span>
            </Navbar>

      )
   }
}

const mapStateToProps = state => ({
    settings: state.settings
})
export default connect(mapStateToProps, {logoutUser})(PrivateNav);