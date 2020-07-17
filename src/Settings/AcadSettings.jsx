import React, {useState, useEffect, useReducer} from 'react';
import SideNav from "./SideNav";
import Options from './Options';
import DegreeSettings from "./DegreeSettings";
import LoadingDots from "../Pages/Loading Page/LoadingDots"
import { Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { updateSettings, setMatriculationYearOptions,
  setTargetGradYearOptions, setDegreeOptions,
  setEditAll } from "../actions/settingsActions";
import { deleteUser } from "../actions/authActions";
import { removeSuccess } from "../actions/successActions";
import isEmpty from "is-empty";
import { generateOptions } from '../utils/commonFunctions';
import { Spin, notification } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';


const AcadSettings = (props) => {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({...state, ...newState}), 
    {
      major: null,
      majorIndex: null,
      specialisation: [],
      secondMajors: [],
      minors: [],
      residence: null,
      matriculationYear: null,
      targetGradYear: null
    }
  );

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if(isEmpty(props.settings.bachelorOptions)) {
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
    if(props.settings.userInfo.major) {
      setUserInput({
        major: props.userInfo.major,
        majorIndex: props.userInfo.majorIndex,
        specialisation: props.userInfo.specialisation ,
        secondMajor: props.userInfo.secondMajor,
        minor: props.userInfo.minor,
        residence: props.userInfo.residential,
        matriculationYear: props.userInfo.matriculationYear,
        targetGradYear: props.userInfo.targetGradYear
      });
      
      if(props.auth.firstTimeRegistered || !props.settings.userInfo.major) {
        console.log(props.auth.firstTimeRegistered)
        console.log(props.settings.userInfo.faculty)
        props.setEditAll(true, props.settings.isEditing, "editAll");
      }
    }
  }, [props.userInfo]);

  useEffect(() => {
    feedback();
  }, [props.success])

  const openNotification = (type, placement) => {
    notification[type]({
      message: type === "success" ? "Success!" : "Whoops!",
      description:
        type === "success" ? props.success : "Please fill in your particulars before saving!",
      placement,
    });
  };

  const handleChange = (unusedParam, object) => {
    const {name, value, selectedindex, tag} = object;
    const updated = {
                      name: value,
                      tag: tag
                    };
    if(name === "major") {
      setUserInput({[name]: {
                              name: value,
                              tag: tag
                            },
                    majorIndex: (selectedindex)});

    } else if(name === "matriculationYear" || name === "targetGradYear") {
      setUserInput({[name]: value});
   
    } else {
      setUserInput({[name]: {
                              name: value,
                              tag: tag
                            }
                    });
    } 
  };


  //Check if there is any part of userData that is undefined/falsy
  const checkSubmission = (userData) => {
    const keys = Object.keys(userData);
    let status;

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      status = (userData[key] || userData[key] === 0) ? true : false;
     
      if(!status) {
        return status = false;
      }
    }

    return status;
  }

  const handleSubmit = (category) => {
    const userData = {
      major: userInput.major,
      majorIndex: userInput.majorIndex,
      specialisation: userInput.specialisation,
      secondMajors: userInput.secondMajors,
      minors: userInput.minors,
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
    props.updateSettings(userData, props.history);
    props.setEditAll(false, props.settings.isEditing, category);

  } else {
    openNotification('warning', 'bottomRight');
    props.setEditAll(true, props.settings.isEditing, category);
  }
} 

  const presentButton = () => {
    if(!props.settings.isEditing[0]) {
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
            handleSubmit(0);
            }}>
            Save Settings
        </button>
      }
    }
  }

  const feedback = () => {
     if(!isEmpty(props.success)) {
      openNotification('success', "bottomRight" );
        setTimeout(props.removeSuccess, 500) &&
        clearTimeout(setTimeout(props.removeSuccess, 2000))
     } 
  }

  console.log(userInput);

  return (
    props.auth.loading 
      ? <LoadingDots/>
      : (<div className="settings">
          <SideNav active="academics"/>
          
          <div className="acad-settings">
            <h1>Academic Settings</h1>

            <Card className="container" id="general-acad">
              <Card.Header className="card-header">General Academic Settings</Card.Header>
              <table className="table settings-table table-hover" id="general-acad-table">
                <tbody>
                  <Options
                    label="Matriculation Year "
                    handleChange={handleChange}
                    name="matriculationYear"
                    value={userInput.matriculationYear}
                    editing={isEditing || props.settings.editAll}
                    optionList={props.settings.matriculationOptions}/>

                  <Options
                    label="Graduation Year"
                    handleChange={handleChange}
                    name="targetGradYear"
                    value={userInput.targetGradYear}
                    editing={isEditing || props.settings.editAll}
                    optionList={props.settings.targetGradOptions}/>

                  <Options
                    label="Residential College "
                    handleChange={handleChange}
                    name="residence"
                    value={userInput.residence}
                    editing={isEditing || props.settings.editAll}
                    optionList={props.settings.residenceOptions}/>
                </tbody>
              </table>

              {presentButton()}
            </Card> 

            <DegreeSettings
              userInput={userInput}
              setUserInput={setUserInput}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />

          {!props.settings.isEditing.editAll 
            ? <button 
                className="button settings-button" id="all-settings"
                onClick={() => props.setEditAll(true, props.settings.isEditing, "editAll")}>
                    Edit All Settings
              </button>
            : (
              <div>
              <button 
                className="button settings-button" id="all-settings"
                onClick={() => {
                    handleSubmit("editAll");}}>
                  Save All Settings
                  <Spin indicator={antIcon} spinning={props.settings.isLoading}/>
              </button>
             
               </div>)
          }
          </div>
        </div>)
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
  auth: state.auth,
  modplan: state.modplan.selectedModules,
  settings: state.settings,
  userInfo: state.settings.userInfo,
  cap: state.cap,
  success: state.success
});

export default connect(mapStateToProps, 
  { updateSettings, setMatriculationYearOptions, setTargetGradYearOptions, setDegreeOptions, setEditAll, removeSuccess, deleteUser }) (AcadSettings);
