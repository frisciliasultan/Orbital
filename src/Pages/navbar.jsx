import React from "react";
import { Link } from "react-router-dom";
import logoImg from "../login.svg"

export class Nav extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                <a class="navbar-brand" href="#">
                    <Link><img src={logoImg} alt="logo"/></Link>
                </a>
                
                <ul className="nav-links">
                    <Link to="/select-modules">
                        <li class="nav-item">Select Modules</li>
                    </Link>
                    <Link to="/module-list">
                        <li class="nav-item">Module List</li>
                    </Link>
                    <Link to="/module-planner">
                        <li class="nav-item">Module Planner</li>
                    </Link>
                    <Link to="/customise-your-own-planner">
                        <li class="nav-item">Customise Your Own Planner</li>
                    </Link>
                </ul>
            </nav>
        )
    }
}

