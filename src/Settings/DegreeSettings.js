import React, { useState } from "react";
import Options from "./Options";
import isEmpty from "is-empty";
import { Card } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setEditAll } from "../actions/settingsActions"
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const DegreeSettings = (props) => {
    console.log(props.userInput)
    console.log(props.userInput.secondMajors)
    console.log(props.userInput.minors)
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    const renderButton = () => {
        if(!props.settings.isEditing.editAll) {
            if(!props.settings.isEditing[1]) {
                return <button 
                    className="button settings-button" 
                    onClick={() => props.setEditAll(true, props.settings.isEditing, 1)}>
                        Edit Settings
                </button>
            } else {
                return (
                    <div>
                        <button 
                            className="button settings-button" 
                            onClick={() => props.handleSubmit(1)}>
                            Save Settings
                        </button>
                        <Spin indicator={antIcon} spinning={props.settings.isLoading}/>

                        <button
                            className="button settings-button"
                            onClick={() => props.setEditAll(false, props.settings.isEditing, 1)}>
                                Cancel
                        </button>
                    </div>
                )
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
                    editing={props.settings.isEditing[1] || props.settings.isEditing.editAll}
                    label="Degree"
                    handleChange={props.handleChange}
                    name="major"
                    value={props.userInput.major}
                    optionList={!isEmpty(props.settings.bachelorOptions)
                        ? props.settings.bachelorOptions
                            : null}/>
                
                {props.userInput.major && props.userInput.major.honours !== undefined && (
                    <Options
                        editing={props.settings.isEditing[1] || props.settings.isEditing.editAll}
                        label="Honours"
                        handleChange={props.handleChange}
                        name="honours"
                        value={props.userInput.major.honours}
                        major={props.userInput.major}
                        setUserInput={props.setUserInput}
                    />
                )}

                {props.userInput.major && props.userInput.major.specialisation && (
                    <Options
                        editing={props.settings.isEditing[1] || props.settings.isEditing.editAll}
                        label="Specialisation"
                        handleChange={props.handleChange}
                        name="specialisation"
                        value={props.userInput.specialisation}
                        optionList={props.userInput.major.specialisation 
                            ? props.userInput.major.specialisation 
                            : null}
                    />
                )}

                {/* <Options 
                   editing={props.settings.isEditing[1] || props.settings.isEditing.editAll}
                    hidden={true}
                    label="Specialisation"
                    handleChange={props.handleChange}
                    name="specialisation"
                    value={props.userInput.specialisation}
                    setUserInput={props.setUserInput}
                    optionList={!isEmpty(props.settings.bachelorOptions)
                        ?  props.settings.bachelorOptions
                        : null}/> */}

                <Options 
                    editing={props.settings.isEditing[1] || props.settings.isEditing.editAll}
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
                    editing={props.settings.isEditing[1] || props.settings.isEditing.editAll}
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
        
        {renderButton()}
        </Card>
    </div>)
}


DegreeSettings.propType = {
    setEditAll: PropTypes.func.isRequired,
    settings: PropTypes.object.isRequired
}


const mapStateToProps = state => ({
    settings: state.settings
})

export default connect(mapStateToProps, { setEditAll }) (DegreeSettings);