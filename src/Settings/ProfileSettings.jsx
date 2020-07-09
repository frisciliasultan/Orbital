import React from "react";
import SideNav from "./SideNav";
import { Card } from "react-bootstrap";

const ProfileSettings = (props) => {
    return (
        <div className="settings">
            <SideNav active="profile"/>
            <h1>Profile</h1>
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
                                    Username
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <label>Email :</label>
                                </td>

                                <td>
                                Username
                                </td>
                            </tr>
    
    
                        </tbody>
                    </table>
                  
                </Card>
        </div>
    )
}

export default ProfileSettings;