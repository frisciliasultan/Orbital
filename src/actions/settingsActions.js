import {
    SET_USER_SETTINGS,
    SET_CURRENT_SEMESTER,
    SET_MATRICULATION_OPTIONS,
    SET_TARGET_GRAD_OPTIONS,
    CLEAN_UP_SETTINGS,
    GET_SUCCESS,
    SET_FACULTY_AND_RESIDENCE,
    SET_EDIT_ALL,
    SETTINGS_LOADING
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
        axios.defaults.timeout = 7000;
        dispatch(setUserLoading(true));
        
        const isFetched = await axios  
                        .get('https://modtree-api.netlify.app/.netlify/functions/user/account')
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
    axios.defaults.timeout = 7000;
    dispatch(setSettingsLoading(true))
    axios
        .put("https://modtree-api.netlify.app/.netlify/functions/user/account", userData)
        .then(res => {dispatch(setUserSettings(res.data.updated))})
        .then(res => {
            dispatch({
                        type: GET_SUCCESS,
                        payload: "Saved successfully!"
            });
            dispatch(setSettingsLoading(false))
            }
        )
        .catch(err => {
                dispatch(setSettingsLoading(false))
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
            dispatch(setFacultyAndResidence(resArr[0].data, resArr[1].data));
        }) 
    .catch(err => {
        console.log(err)
    });
}

export const setFacultyAndResidence = (faculties, residences) => {
    return {
        type: SET_FACULTY_AND_RESIDENCE,
        faculties, 
        residences
    }
}

export const setEditAll = (status, current, category) => {
    return {
        type: SET_EDIT_ALL,
        status,
        current,
        category
    }
} 

export const setSettingsLoading = (status) => {
    return {
        type: SETTINGS_LOADING,
        payload: status
    }
}

