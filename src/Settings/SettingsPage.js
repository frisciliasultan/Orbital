import React, { useState } from "react";
import SideNav from "./SideNav";
import ProfileSettings from "./ProfileSettings";
import AcadSettings from "./AcadSettings";
import AccountSettings from "./AccountSettings";

const SettingsPage = (props) => {
    const [active, setActive] = useState(props.active);
    console.log(props.active);
    return (
        <div className="settings">
            <SideNav active={active}/>
            <ProfileSettings/>
            <AcadSettings/>
            <AccountSettings/>

        </div>
    )
}

export default SettingsPage;