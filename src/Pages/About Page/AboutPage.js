import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";


const AboutPage = (props) => {
    useEffect(() => {
        // If logged in and not first time registering and initial setup (current AY, userInfo) done, 
        // if user navigates to Login page, should redirect them to module planner
        if(props.auth.isAuthenticated) {
            if (!props.auth.firstTimeRegistered ) {
                props.history.push("/module-planner");
            } else {
                props.history.push("/settings/academics");
            }
        }
      }, [props.auth.isAuthenticated]);

    return (
        <div>
            <br/>
            <br/>
            <h2>About</h2>
        </div>
       
    )
        
    
}

AboutPage.propType = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect (mapStateToProps) (AboutPage);