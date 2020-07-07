import React from "react";
import Options from "./Options";
import HiddenOptions from "./HiddenOptions";
import isEmpty from "is-empty";

const DegreeSettings = (props) => {

    return (
        <div>
            {!isEmpty(props.facultyOptions) && (
                <Options
                status={props.status}
                label={props.status === "first" ? "Your Faculty: " : `Your ${props.status} Faculty: `}
                handleChange={props.handleChange}
                name={"faculty"}
                value={props.userInput.faculty}
                optionList={props.facultyOptions}/>)}
          
            {props.userInput.faculty && !isEmpty(props.facultyOptions) && (
                <div>
                    <Options
                        status={props.status}
                        label="Your Degree: "
                        handleChange={props.handleChange}
                        name="major"
                        value={props.userInput.major}
                        optionList={(props.userInput.faculty && !isEmpty(props.facultyOptions)) 
                            ? props.facultyOptions[props.userInput.facIndex].undergraduate.degrees
                                : null}/>

                    <HiddenOptions 
                        status={props.status}
                        title="Add Specialisation"
                        label="Your Specialisation: "
                        handleChange={props.handleChange}
                        name="specialisation"
                        value={props.userInput.specialisation}
                        optionList={props.userInput.major && props.facultyOptions[props.userInput.facIndex].undergraduate.degrees}/>

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
        </div>
    )
}

export default DegreeSettings;