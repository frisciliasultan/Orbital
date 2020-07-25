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
import { checkSubmission } from '../utils/commonFunctions';
import { Spin, notification } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';


const AcadSettings = (props) => {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({...state, ...newState}), 
    {
      major: null,
      majorIndex: null,
      specialisation: null,
      secondMajors: [],
      minors: [],
      residence: null,
      matriculationYear: null,
      targetGradYear: null
    }
  );

  useEffect(() => {
    if(isEmpty(props.settings.bachelorOptions)) {
        props.setDegreeOptions(props.history);
    } 
  }, []);

  useEffect(() => {
    if(props.settings.currentAY && isEmpty(props.settings.matriculationOptions)) {
        props.setMatriculationYearOptions(props.settings.currentAY, props.settings.currentSemester);
        props.setTargetGradYearOptions(props.settings.currentAY, props.settings.currentSemester);
    }
  }, [props.settings.currentAY]);

  useEffect(() => {
    if(!isEmpty(props.settings.userInfo)) {
      if(props.settings.userInfo.major) {
        console.log('updated')
        setUserInput({
          major: props.userInfo.major,
          majorIndex: props.userInfo.majorIndex,
          specialisation: props.userInfo.specialisation,
          secondMajors: props.userInfo.secondMajors,
          minors: props.userInfo.minors,
          residence: props.userInfo.residential,
          matriculationYear: props.userInfo.matriculationYear,
          targetGradYear: props.userInfo.targetGradYear
        });
      } else {
        props.setEditAll(true, props.settings.isEditing, "editAll");
      }
    }
  }, [props.settings.userInfo]);

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
    const {name, value, selectedindex, tag, honours, specialisation} = object;

    if(name === "major") {
      if(honours || specialisation) {
        setUserInput(
          {[name]: {
            name: value,
            tag: tag,
            honours: honours,
            specialisation: specialisation
          },
          majorIndex: (selectedindex)}
        );
      } else {
        setUserInput(
          {[name]: {
            name: value,
            tag: tag
          },
          majorIndex: (selectedindex)}
        );
      }
    } else if(name === "matriculationYear" || name === "targetGradYear" || name === "specialisation") {
      console.log(name)
      setUserInput({[name]: value});
   
    } else {
      // if(isEmpty(options)) {
      //   setUserInput(
      //     {[name]: {
      //       name: value,
      //       tag: tag,
      //       options: options
      //     }}
      //   );
      // } else {
        setUserInput(
          {[name]: {
            name: value,
            tag: tag
          }}
        );
      // }
    } 
  };

  const handleSubmit = (category) => {
    const userData = {
      name: props.auth.user.name,
      email: props.auth.user.email,
      major: userInput.major,
      majorIndex: userInput.majorIndex,
      specialisation: userInput.specialisation ? userInput.specialisation : "None ",
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
      props.updateSettings(userData, props.history, props.settings.isEditing, category);

    } else {
      openNotification('warning', 'bottomRight');
      // props.setEditAll(true, props.settings.isEditing, category);
    }
  } 

  const presentButton = () => {
    if(!props.settings.isEditing.editAll) {
      if(!props.settings.isEditing[0]) {
        return <button 
          className="button settings-button" 
          onClick={() => props.setEditAll(true, props.settings.isEditing, 0)}>
              Edit Settings
        </button>

      } else {
        return (
          <div>
            <button 
              className="button settings-button" 
              onClick={() => {
                handleSubmit(0);
                }}>
                Save Settings
            </button>
            <Spin indicator={antIcon} spinning={props.settings.isLoading}/>
            <button
                className="button settings-button"
                onClick={() => props.setEditAll(false, props.settings.isEditing, 0)}>
                  Cancel
            </button>
          </div>
        )
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

  return (
    props.auth.loading 
      ? <LoadingDots/>
      : (<div className="settings">
          <SideNav active="academics" major={props.settings.userInfo.major} isEditing={props.settings.isEditing}/>
          
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
                    dependency={userInput.targetGradYear}
                    editing={props.settings.isEditing[0] || props.settings.isEditing.editAll}
                    optionList={props.settings.matriculationOptions}/>

                  <Options
                    label="Graduation Year"
                    handleChange={handleChange}
                    name="targetGradYear"
                    value={userInput.targetGradYear}
                    dependency={userInput.matriculationYear}
                    editing={props.settings.isEditing[0] || props.settings.isEditing.editAll}
                    optionList={props.settings.targetGradOptions}/>

                  <Options
                    label="Residential College "
                    handleChange={handleChange}
                    name="residence"
                    value={userInput.residence}
                    editing={props.settings.isEditing[0] || props.settings.isEditing.editAll}
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
                className="button settings-button" id="edit-all-button"
                onClick={() => {
                    props.setEditAll(true, {}, "editAll");
                  }}>
                    Edit All Settings
              </button>
            : (
              <div className="save-all-container">
                <Spin indicator={antIcon} spinning={props.settings.isLoading} >
                  <button 
                    className="button settings-button" id="save-all-button"
                    onClick={() => {
                        handleSubmit("editAll");}}>
                      Save All Settings
                  </button>
                </Spin>
                <button
                  className="button settings-button" id="cancel-save-all-button"
                  onClick={() => props.setEditAll(false, props.settings.isEditing, "editAll")}>
                  Cancel
                </button>
              </div>
              )
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
  modplan: PropTypes.array.isRequired,
  settings: PropTypes.object.isRequired,
  cap: PropTypes.object.isRequired,
  success: PropTypes.string.isRequired
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
  { updateSettings, setMatriculationYearOptions, setTargetGradYearOptions, setDegreeOptions, setEditAll, removeSuccess }) (AcadSettings);
