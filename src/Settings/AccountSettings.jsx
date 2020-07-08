import React from "react";
import SideNav from "./SideNav";

const AccountSettings = (props) => {
    return (
        <div className="settings">
            <SideNav active="account"/>
            <h1>account</h1>
        </div>
    )
}

export default AccountSettings;