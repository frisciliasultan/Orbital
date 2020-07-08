import React from "react";
import Options from "./Options";
import HiddenOptions from "./HiddenOptions";
import isEmpty from "is-empty";
import { Card } from "react-bootstrap";

const DegreeSettings = (props) => {

    return (
        <Card className="container" id="degree-settings">
            <Card.Header className="card-header">Degree Settings</Card.Header>

            <table className="table table-hover settings-table" id="degree-acad-table">
            <tbody>
                <Options
                    status={props.status}
                    label={props.status === "first" ? "Faculty : " : `${props.status} Faculty : `}
                    handleChange={props.handleChange}
                    name={"faculty"}
                    value={props.userInput.faculty}
                    optionList={props.facultyOptions}/>

                <Options
                    status={props.status}
                    label="Degree : "
                    handleChange={props.handleChange}
                    name="major"
                    value={props.userInput.major}
                    optionList={(props.userInput.faculty && !isEmpty(props.facultyOptions)) 
                        ? props.facultyOptions[props.userInput.facIndex].undergraduate.degrees
                            : null}/>

                <HiddenOptions 
                    status={props.status}
                    title="Add Specialisation"
                    label="Specialisation : "
                    handleChange={props.handleChange}
                    name="specialisation"
                    value={props.userInput.specialisation}
                    optionList={(props.userInput.major && !isEmpty(props.facultyOptions))
                        ?  props.facultyOptions[props.userInput.facIndex].undergraduate.degrees
                        : null}/>

            {props.userInput.faculty && !isEmpty(props.facultyOptions) && (
            <div>
                

               

                <HiddenOptions 
                    status={props.status}
                    title="Add Second Major"
                    label="Your Second Major: "
                    handleChange={props.handleChange}
                    name="secondMajor"
                    value={props.userInput.secondMajor}
                    optionList={props.facultyOptions[props.userInput.facIndex].undergraduate.secondMajors}/>
                
                <HiddenOptions 
                    status={props.status}
                    title="Add Minor"
                    label="Your Minor: "
                    handleChange={props.handleChange}
                    name="minor"
                    value={props.userInput.minor}
                    optionList={props.facultyOptions[props.userInput.facIndex].undergraduate.minors}/>
            </div>)}  
            </tbody>
          </table>
          
            
        </Card>
    )
}

export default DegreeSettings;