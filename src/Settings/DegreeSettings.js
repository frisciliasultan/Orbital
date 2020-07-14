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
            <h2 className="card-header">Degree Settings</h2>

            <table className="table settings-table table-hover " id="degree-acad-table">
            <tbody>
                {/* <Options
                    status={props.status}
                    editing={isEditing || props.settings.editAll}
                    label={props.status === "first" ? "Faculty : " : `${props.status} Faculty : `}
                    handleChange={props.handleChange}
                    name={"faculty"}
                    value={props.userInput.faculty}
                    optionList={props.settings.facultyOptions}/> */}

                <Options
                    editing={isEditing || props.settings.editAll}
                    label="Degree"
                    handleChange={props.handleChange}
                    name="major"
                    value={props.userInput.major}
                    optionList={!isEmpty(props.settings.bachelorOptions)
                        ? props.settings.bachelorOptions
                            : null}/>

                <Options 
                    editing={isEditing || props.settings.editAll}
                    hidden={true}
                    label="Specialisation"
                    handleChange={props.handleChange}
                    name="specialisation"
                    value={props.userInput.specialisation}
                    setUserInput={props.setUserInput}
                    optionList={!isEmpty(props.settings.bachelorOptions)
                        ?  props.settings.bachelorOptions
                        : null}/>

                <Options 
                    editing={isEditing || props.settings.editAll}
                    hidden={true}
                    label="Second Major"
                    handleChange={props.handleChange}
                    name="secondMajors"
                    value={props.userInput.secondMajors}
                    setUserInput={props.setUserInput}
                    optionList={!isEmpty(props.settings.secondMajorOptions) 
                        ? props.settings.secondMajorOptions
                        : null}/>
                
                <Options 
                    editing={isEditing || props.settings.editAll}
                    hidden={true}
                    label="Minor"
                    handleChange={props.handleChange}
                    name="minors"
                    value={props.userInput.minors}
                    setUserInput={props.setUserInput}
                    optionList={(!isEmpty(props.settings.minorOptions)) 
                        ? props.settings.minorOptions
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