import React, { Component } from "react";

class LoadingDots extends Component {
  render() {
    return (
        <div className="loading-container">
            {/* <DotWrapper> */}
                <i className="fas fa-circle dot1" id="dot1"/>
                <i className="fas fa-circle dot2" id="dot2"/>
                <i className="fas fa-circle dot3" id="dot3"/>
                {/* <Dot id="dot1"/>
                <Dot id="dot2"/>
                <Dot id="dot3"/> */}
            {/* </DotWrapper> */}
        </div> 
    )
  }
}
export default LoadingDots