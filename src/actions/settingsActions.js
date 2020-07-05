import {
    SET_USER_SETTINGS,
    SET_CURRENT_SEMESTER,
    SET_MATRICULATION_OPTIONS,
    SET_TARGET_GRAD_OPTIONS,
    CLEAN_UP_SETTINGS,
    GET_SUCCESS,
    SET_FACULTY_AND_RESIDENCE
} from "./types";
import { setUserLoading } from "./authActions";
import axios from "axios";

export const setUserSettings = (userData) => {
    return {
        type: SET_USER_SETTINGS,
        payload: userData
    }
}

export const initialSettings = () => async dispatch => {
    try {
        axios.defaults.timeout = 5000;
        dispatch(setUserLoading(true));
        
        const isFetched = await axios  
                        .get('https://modtree-api.netlify.app/.netlify/functions/account')
                        .then(res => {
                                dispatch(setUserSettings(res.data))
                            })
                        .then(res => {return true})
        if(isFetched) {
            dispatch(setUserLoading(false))
        }
    }
    catch (err) {
            dispatch(setUserLoading(false));
            console.log(err)
            // window.location.replace("/500-error")
        }
}

export const updateSettings = (userData) => dispatch => {
    axios.defaults.timeout = 5000;
    axios
        .put("https://modtree-api.netlify.app/.netlify/functions/account", userData)
        .then(res => {console.log(res); dispatch(setUserSettings(res.data.updated))})
        .then(res => {
            dispatch({
                        type: GET_SUCCESS,
                        payload: "Saved successfully!"
            });
            dispatch(setUserLoading(false))
            }
        )
        .catch(err => {
                dispatch(setUserLoading(false))
                console.log(err);
                // window.location.replace("/500-error")
            })
};

export const setCurrentSemester = (currentAY, currentSemester, month) => {
    return {
        type: SET_CURRENT_SEMESTER,
        currentAY,
        currentSemester,
        month
    }
}

export const setMatriculationYearOptions = (currentAY, currentSemester) => {
    return {
        type: SET_MATRICULATION_OPTIONS,
        currentAY,
        currentSemester
    }
}

export const setTargetGradYearOptions = (AY, Semester) => {
    return {
        type: SET_TARGET_GRAD_OPTIONS,
        AY,
        Semester
    }
}

export const cleanUpSettings = () => {
    return { 
        type: CLEAN_UP_SETTINGS
    }
}

export const setDegreeOptions = () => dispatch => {
    axios.defaults.timeout = 5000;
    axios.all([
        axios.get('https://modtree-api.netlify.app/.netlify/functions/info/faculties'),
        axios.get('https://modtree-api.netlify.app/.netlify/functions/info/residences')
    ])
    .then(resArr => {
            dispatch(setFacultyAndResidence(res.data[0], res.data[1]);
        }) 
    .catch(err => {
        console.log(err)
    });
}

export const setFacultyAndResidence(faculties, residences) {
    return {
        type: SET_FACULTY_AND_RESIDENCE,
        faculties, 
        residences
    }
}


//turn array of choices into options dropdown
// export const generateOptions = (optionList, category,) {

//     let facIndex = this.state.facIndex;
//   if(choices === 'faculty'){
//     return this.state.dummyfac.map((obj) => {
//       return (
//       <option value={Object.keys(obj)}>
//         {Object.keys(obj)}
//       </option>
//       );
//     });
//   } else if(choices === 'major') {
//       if(this.state.faculty) {
//     return this.state.dummyfac
//            [facIndex]
//            [this.state.faculty].map((obj) => {
//                   return (
//                     <option value={Object.keys(obj)}>
//                       {Object.keys(obj)}
//                     </option>
//                   )
//               }
//     )}
//   } else if(choices === 'specialisation') {
//       if(this.state.major && this.state.faculty) {
//       return this.state.dummyfac
//              [facIndex]
//              [this.state.faculty][this.state.majorIndex][this.state.major].map((item) => {
//                   return (
//                     <option>
//                       {item}
//                     </option>
//                   )
//                 }    
//       )}
//   } else if(choices === 'residence') {
//     return this.state.residenceOptions.map((obj) => {
//       return (
//       <option value={obj}>
//         {obj}
//       </option>
//       );
//     });
//   } else {
//       let options;

//       if(choices === 'matriculationYear') {
//         options = this.props.settings.matriculationOptions
//       } else {
//         options = this.props.settings.targetGradOptions
//       }

//     return options.map((option) => {
//       return (
//       <option value={option}>
//         {option}
//       </option>
//       );
//     });
//   }
// }


