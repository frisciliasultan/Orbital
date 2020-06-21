import React from "react";
import logoImg from "../../textLogo.svg";
import { Navbar, Nav } from "react-bootstrap"
import NavIcon from "../NavIcon";



export class PrivateNav extends React.Component {
    
    render() {
        return (
            <Navbar className="navbar" expand="xl" sticky="top">
                <Navbar.Brand href="/module-planner" className="navbrand">
                    <img
                    alt=""
                    src={logoImg}
                    width="150"
                    height="30"
                    className="d-inline-block align-top"
                    />{' '}
                </Navbar.Brand>
                
                    <Nav.Link href="/select-modules" className="navlink">
                            Select Module
                    </Nav.Link>

                    <Nav.Link href="/module-planner" className="navlink">
                        Module Planner
                    </Nav.Link>

                    <Nav.Link href="/cap-calculator" className="navlink">
                        CAP Calculator
                    </Nav.Link>

                    <Nav.Link href="/dashboard" className="navlink">
                        Dashboard
                    </Nav.Link>

                     {/* <NavIcon icon={this.props.userProfilePicture} /> */}
                     {/* <NavIcon icon={logoImg} /> */}
                     <Nav.Link href="/settings" className="navlink">
                         Settings
                     </Nav.Link>

            </Navbar>

      )
   }
}