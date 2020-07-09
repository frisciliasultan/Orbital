import React, {useState, useEffect, useReducer} from 'react';
import SideNav from "./SideNav";
import Options from './Options';
import DegreeSettings from "./DegreeSettings";
import { Link } from 'react-router-dom';
import axios from "axios";
import { Button, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { updateSettings, setMatriculationYearOptions,
  setTargetGradYearOptions, setDegreeOptions,
  setEditAll } from "../actions/settingsActions";
import { deleteUser } from "../actions/authActions";
import { removeSuccess } from "../actions/successActions";
import isEmpty from "is-empty";
import { generateOptions } from '../utils/commonFunctions';



const AcadSettings = (props) => {
  
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({...state, ...newState}), 
    {
      faculty: props.userInfo.faculty,
      facIndex: props.userInfo.facIndex,
      major: props.userInfo.major,
      majorIndex: props.userInfo.majorIndex,
      specialisation: props.userInfo.specialisation,
      secondMajor: props.userInfo.secondMajor,
      minor: props.userInfo.minor,
      residence: props.userInfo.residential,
      matriculationYear: props.userInfo.matriculationYear,
      targetGradYear: props.userInfo.targetGradYear
    }
  );

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if(isEmpty(props.settings.facultyOptions)) {
        props.setDegreeOptions();
    }
  }, []);

  useEffect(() => {
    if(props.settings.currentAY && isEmpty(props.settings.matriculationOptions)) {
        props.setMatriculationYearOptions(props.settings.currentAY, props.settings.currentSemester);
        props.setTargetGradYearOptions(props.settings.currentAY, props.settings.currentSemester);
    }
  }, [props.settings.currentAY]);

  useEffect(() => {
    if(!isEmpty(props.userInfo)) {
      setUserInput({
        faculty: props.userInfo.faculty,
        facIndex: props.userInfo.facIndex,
        major: props.userInfo.major,
        majorIndex: props.userInfo.majorIndex,
        specialisation: props.userInfo.specialisation,
        secondMajor: props.userInfo.secondMajor,
        minor: props.userInfo.minor,
        residence: props.userInfo.residential,
        matriculationYear: props.userInfo.matriculationYear,
        targetGradYear: props.userInfo.targetGradYear
      });
    }
  }, [props.userInfo]);

  const handleChange = (e) => {
    const {name, value, selectedIndex} = e.target;

    if(name === "faculty") {
      setUserInput({[name]: value,
                      facIndex: (selectedIndex - 1),
                      major: null});
        
    } else if(name === "major") {
      setUserInput({[name]: value,
                      majorIndex: (selectedIndex - 1)});

    } else {
      setUserInput({[name]: value});
    } 
  };


  //Check if there is any part of userData that is undefined/falsy
  const checkSubmission = (userData) => {
    const keys = Object.keys(userData);
    let status;

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      status = (userData[key] || userData[key] === 0) ? true : false;
      console.log(status);
      console.log(userData[key]);
      if(!status) {
        return status = false;
      }
    }
    return status;
  }

  const handleSubmit = () => {
    const userData = {
      faculty: userInput.faculty,
      facIndex: userInput.facIndex,
      major: userInput.major,
      majorIndex: userInput.majorIndex,
      specialisation: userInput.specialisation ? userInput.specialisation : "None",
      secondMajor: userInput.secondMajor ? userInput.secondMajor : "None",
      minor: userInput.minor ? userInput.minor : "None",
      residential: userInput.residence,
      matriculationYear: userInput.matriculationYear,
      targetGradYear: userInput.targetGradYear,
      modPlan: props.modplan,
      cap: props.cap.cap,
      targetCap: props.cap.targetCap
    }

  //if all props of userData is filled, allow user to save
  //else alert popup to redirect user back to filling in their data (TEMPORARY)
  if(checkSubmission(userData)) {
    props.updateSettings(userData);
  } else {
    alert("Please fill in all the fields before saving!");
  }
} 

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
            handleSubmit();
            setIsEditing(false);}}>
            Save Settings
        </button>
      }
    }
  }

  return (
    <div className="settings">
      <SideNav active="academics"/>
      
      <div className="acad-settings">
        <h1>Academic Settings</h1>

        <Card classname="container" id="general-acad">
          <Card.Header className="card-header">General Academic Settings</Card.Header>
          <table className="table settings-table table-hover" id="general-acad-table">
            <tbody>
              <Options
                label="Residential College : "
                handleChange={handleChange}
                name="residence"
                value={userInput.residence}
                editing={isEditing || props.settings.editAll}
                optionList={props.settings.residenceOptions}/>
              
              <Options
                label="Matriculation Year : "
                handleChange={handleChange}
                name="matriculationYear"
                value={userInput.matriculationYear}
                editing={isEditing || props.settings.editAll}
                optionList={props.settings.matriculationOptions}/>

              <Options
                label="Graduation Year : "
                handleChange={handleChange}
                name="targetGradYear"
                value={userInput.targetGradYear}
                editing={isEditing || props.settings.editAll}
                optionList={props.settings.targetGradOptions}/>
            </tbody>
          </table>

          {presentButton()}
        </Card> 

        <DegreeSettings
          status="first"
          userInput={userInput}
          setUserInput={setUserInput}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />

      {!props.settings.editAll 
        ? <button 
            className="button settings-button" id="all-settings"
            onClick={() => props.setEditAll(true)}>
                Edit All Settings
          </button>
        : <button 
            className="button settings-button" id="all-settings"
            onClick={() => {
                handleSubmit();
                props.setEditAll(false);}}>
              Save All Settings
          </button>
      }
      </div>
    </div>
  );
}


AcadSettings.propTypes = {
  updateSettings: PropTypes.func.isRequired,
  setMatriculationYearOptions: PropTypes.func.isRequired,
  setTargetGradYearOptions: PropTypes.func.isRequired,
  setDegreeOptions: PropTypes.func.isRequired,
  setEditAll: PropTypes.func.isRequired,
  removeSuccess: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  modplan: PropTypes.array.isRequired,
  settings: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  loading: state.auth.loading,
  modplan: state.modplan.selectedModules,
  settings: state.settings,
  userInfo: state.settings.userInfo,
  cap: state.cap,
  success: state.success
});

export default connect(mapStateToProps, 
  { updateSettings, setMatriculationYearOptions, setTargetGradYearOptions, setDegreeOptions, setEditAll, removeSuccess, deleteUser }) (AcadSettings);
