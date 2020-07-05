import React, {useState, useEffect, useReducer} from 'react';
import { Options } from '../Pages/Module Selection Page/ModuleList';
import { Link } from 'react-router-dom';
import axios from "axios";
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { updateSettings, setMatriculationYearOptions, setTargetGradYearOptions, setDegreeOptions } from "../actions/settingsActions";
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
      residence: props.userInfo.residential,
      matriculationYear: props.userInfo.matriculationYear,
      targetGradYear: props.userInfo.targetGradYear
    }
  )

  // const residenceOptions = ['N/A','CAPT', 'RC4', 'RVRC','Tembusu', 'USP'];
  // const dummyfac = [{'Business': [{'Business Administration': ['A', 'B']},
  //                   {'Accountancy': ['C', 'D']}]},
  //                 {'FASS': [{'C': ['N/A']},
  //                 {'D': ['N/A']}]},
  //                 {
  //                 'Computing': [
  //                       {'Computer Science': ['N/A']},
  //                       {'Business Analytics': ['N/A']}
  //                 ] 
  // }];

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
    if(!isEmpty(props.settings.userInfo)) {
      setUserInput({
        faculty: props.userInfo.faculty,
        facIndex: props.userInfo.facIndex,
        major: props.userInfo.major,
        majorIndex: props.userInfo.majorIndex,
        specialisation: props.userInfo.specialisation,
        residence: props.userInfo.residential,
        matriculationYear: props.userInfo.matriculationYear,
        targetGradYear: props.userInfo.targetGradYear
      });
    }
  }, [props.settings.userInfo]);

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
    console.log(userInput.facIndex);
  };

 //turn array of choices into options dropdown
//   const generateOptions = (choices) => {
//     if(choices === 'faculty'){
//       return props.settings.facultyOptions.map((obj) => {
//         return (
//         <option value={Object.keys(obj)}>
//           {Object.keys(obj)}
//         </option>
//         );
//       });
//     } else if(choices === 'major') {
//         if(userInput.faculty) {
//         return dummyfac
//               [facIndex]
//               [userInput.faculty].map((obj) => {
//                       return (
//                         <option value={Object.keys(obj)}>
//                           {Object.keys(obj)}
//                         </option>
//                       )
//                   }
//         )}
//     } else if(choices === 'specialisation') {
//         if(userInput.major && userInput.faculty) {
//         return dummyfac
//               [facIndex]
//               [userInput.faculty][userInput.majorIndex][userInput.major].map((item) => {
//                     return (
//                       <option>
//                         {item}
//                       </option>
//                     )
//                   }    
//         )}
//     } else if(choices === 'residence') {
//       return residenceOptions.map((obj) => {
//         return (
//         <option value={obj}>
//           {obj}
//         </option>
//         );
//       });
//     } else {
//         if(choices === 'matriculationYear') {
//           return props.settings.matriculationOptions.map((option) => {
//             return (
//             <option value={option.substr(3,9)}>
//               {option}
//             </option>
//             );
//           });
//         } else {
//             return props.settings.targetGradOptions.map((option) => {
//               return (
//               <option value={option.substr(6,9)}>
//                 {option}
//               </option>
//               );
//             });
//           }
//       }
// }

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
    specialisation: userInput.specialisation,
    residential: userInput.residence,
    matriculationYear: userInput.matriculationYear,
    targetGradYear: userInput.targetGradYear,
    modPlan: props.modplan,
    cap: props.cap.cap,
    targetCap: props.cap.targetCap
  }

  //if all props of userData is filled, allow user to save
  //else alert popup to redirect user back to filling in their data (TEMPORARY)
  return checkSubmission(userData) ?  props.updateSettings(userData) : alert("Please fill in all the fields before saving!");

} 

  return (
      <div className="container">
        <h5>Enter your particulars so that we can personalise your user experience!</h5>

        <form>
          <Options>
            
          </Options>
          <label>Your Faculty: {userInput.faculty}</label>
          <select
              name="faculty" 
              onChange={handleChange}
              value={userInput.faculty}>
                <option selected disabled>
                  Choose Your Faculty
                </option>
              {/* {!isEmpty(props.settings.userInfo) && generateOptions(props.settings.facultyOptions, "faculty")} */}
              {generateOptions(props.settings.facultyOptions, "faculty")}
            </select>   
            <br/>
            <br/>

            <label>Your Major: {userInput.major}</label>
            <select
              name="major"
              onChange={handleChange}
              value={userInput.major}>
                (<option selected disabled>
                  Choose Your Major
                </option>)
              {!isEmpty(props.settings.userInfo) && generateOptions("major") }
            </select>
            <br/>
            <br/>

            <label>Your Specialisation: {userInput.specialisation}  </label>
            <select
              name="specialisation"
              onChange={handleChange}
              value={userInput.specialisation}>
                (<option selected disabled>
                  Choose Your Specialisation
                </option>)
              {!isEmpty(props.settings.userInfo) && generateOptions("specialisation")}
            </select>
            <br/>
            <br/>

            <label>Your Residential College: {userInput.residence}</label>
            <select
              name="residence"
              onChange={handleChange}
              value={userInput.residence}>
                (<option selected disabled>
                  Choose Your Residence
                </option>)
              {/* {!isEmpty(props.settings.userInfo) && generateOptions("residence")} */}
              {generateOptions(props.settings.residenceOptions, "residence")}
            </select>
            <br/>
            <br/>

            <label>Year of Matriculation: {userInput.matriculationYear}</label>
            <select
              name="matriculationYear"
              onChange={handleChange}
              value={userInput.matriculationYear}>
                (<option selected disabled>
                  Choose Your Year of Matriculation
                </option>)
              {!isEmpty(props.settings.userInfo) && generateOptions("matriculationYear")}
            </select>
            <br/>
            <br/>

            <label>Target Graduation Year: {userInput.targetGradYear}</label>
            <select
              name="targetGradYear"
              onChange={handleChange}
              value={userInput.targetGradYear}>
                (<option selected disabled>
                  Choose Your Target Graduation Year
                </option>)
              {!isEmpty(props.settings.userInfo) && generateOptions("targetGradYear")}
            </select>
            <br/>
            <br/>
          </form>

        <Button className='button' id='save' onClick={() => handleSubmit()}>Save Settings</Button>
        {!isEmpty(props.success) && 
                    setTimeout(props.removeSuccess, 500) &&
                    clearTimeout(setTimeout(props.removeSuccess, 2000))}
        {!isEmpty(props.success) && props.history.push("/module-planner")
                // <p className="success">
                //     {props.success}
                // </p>
                
                }
                
               

        <Button className='button' id='delete' onClick={() => props.deleteUser()}>Delete Account</Button>
        
      </div>
  );
}


AcadSettings.propTypes = {
  updateSettings: PropTypes.func.isRequired,
  setMatriculationYearOptions: PropTypes.func.isRequired,
  setTargetGradYearOptions: PropTypes.func.isRequired,
  setDegreeOptions: PropTypes.func.isRequired,
  removeSuccess: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  modplan: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  modplan: state.modplan.selectedModules,
  settings: state.settings,
  userInfo: state.settings.userInfo,
  cap: state.cap,
  success: state.success
});

export default connect(mapStateToProps, 
  { updateSettings, setMatriculationYearOptions, setTargetGradYearOptions, setDegreeOptions, removeSuccess, deleteUser }) (AcadSettings);
