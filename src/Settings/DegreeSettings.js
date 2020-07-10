import React, { useState } from "react";
import Options from "./Options";
import isEmpty from "is-empty";
import { Card } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import { handleSaveClick } from ""

const DegreeSettings = (props) => {
    const [isEditing, setIsEditing] = useState(false);
    const [addDegree, setAddDegree] = useState(false);

    const presentButton = () => {
        if(!props.settings.editAll) {
          if(!isEditing) {
            return <button 
              className="button settings-button" 
              onClick={() => setIsEditing(true)}>
                  Edit Settings
            </button>
          } else {
            return <button 
              className="button settings-button" 
              onClick={() => {
                props.handleSubmit();
                setIsEditing(false);}}>
                Save Settings
            </button>
          }
        }
      }

    return (
        <div>
        <Card className="container" id="degree-settings">
            <h2 className="card-header">
                {props.status === "first" 
                    ? "Degree Settings" 
                    : `${props.status} Degree Settings`}
            </h2>

            <table className="table settings-table table-hover " id="degree-acad-table">
            <tbody>
                <Options
                    status={props.status}
                    editing={isEditing || props.settings.editAll}
                    label={props.status === "first" ? "Faculty : " : `${props.status} Faculty : `}
                    handleChange={props.handleChange}
                    name={"faculty"}
                    value={props.userInput.faculty}
                    optionList={props.settings.facultyOptions}/>

                <Options
                    status={props.status}
                    editing={isEditing || props.settings.editAll}
                    label="Degree : "
                    handleChange={props.handleChange}
                    name="major"
                    value={props.userInput.major}
                    optionList={(props.userInput.faculty && !isEmpty(props.settings.facultyOptions)) 
                        ? props.settings.facultyOptions[props.userInput.facIndex].undergraduate.degrees
                            : null}/>

                <Options 
                    status={props.status}
                    editing={isEditing || props.settings.editAll}
                    hidden={true}
                    title="Add Specialisation"
                    label="Specialisation : "
                    handleChange={props.handleChange}
                    name="specialisation"
                    value={props.userInput.specialisation}
                    optionList={(props.userInput.major && !isEmpty(props.settings.facultyOptions))
                        ?  props.settings.facultyOptions[props.userInput.facIndex].undergraduate.degrees
                        : null}/>

                <Options 
                    status={props.status}
                    editing={isEditing || props.settings.editAll}
                    hidden={true}
                    category="secondMajor"
                    label="Second Major : "
                    handleChange={props.handleChange}
                    name="secondMajor"
                    value={props.userInput.secondMajor}
                    setUserInput={props.setUserInput}
                    optionList={(props.userInput.major && !isEmpty(props.settings.facultyOptions)) 
                        ? props.settings.facultyOptions[props.userInput.facIndex].undergraduate.secondMajors
                        : null}/>
                
                <Options 
                    status={props.status}
                    editing={isEditing || props.settings.editAll}
                    hidden={true}
                    category="minor"
                    label="Minor : "
                    handleChange={props.handleChange}
                    name="minor"
                    value={props.userInput.minor}
                    setUserInput={props.setUserInput}
                    optionList={(props.userInput.major && !isEmpty(props.settings.facultyOptions)) 
                        ? props.settings.facultyOptions[props.userInput.facIndex].undergraduate.minors
                        : null}/>

            </tbody>
        </table>
        
        {presentButton()}
        </Card>
    </div>)
}


DegreeSettings.propType = {
    settings: PropTypes.object.isRequired
}


const mapStateToProps = state => ({
    settings: state.settings
})

export default connect(mapStateToProps) (DegreeSettings);