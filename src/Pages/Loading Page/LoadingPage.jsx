import React, { Component } from "react";
import styled, { keyframes } from "styled-components";

const BounceAnimation = keyframes`
  0% { margin-bottom: 0; }

  50% { margin-bottom: 20px; }

  100% { margin-bottom: 0 }
`;
const DotWrapper = styled.div`
  display: flex;
  align-items: flex-end;
`;
const Dot = styled.div`
//   background-color: black;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  margin: 0 15px;
  /* Animation */
  animation: ${BounceAnimation} 0.8s linear infinite;
  animation-delay: ${props => props.delay};
`;
class LoadingDots extends Component {
  render() {
    return (
        <div className="loading-container">
            <DotWrapper>
                <Dot style={{backgroundColor: "#11224b"}} delay="0s" />
                <Dot style={{backgroundColor: "#f78620"}} delay=".2s" />
                <Dot style={{backgroundColor: "#11224b"}} delay=".4s" />
            </DotWrapper>
        </div> 
    )
  }
}
export default LoadingDots