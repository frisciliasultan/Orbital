import {
    SET_USER_SETTINGS,
    SET_CURRENT_SEMESTER,
    SET_MATRICULATION_OPTIONS,
    SET_TARGET_GRAD_OPTIONS,
    CLEAN_UP_SETTINGS,
    GET_SUCCESS,
    SET_ACAD_OPTIONS,
    SET_EDIT_ALL,
    SET_FIRST_RENDER,
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
        axios.defaults.timeout = 10000;
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

export const updateSettings = (userData, history, currIsEditing, editCategory) => dispatch => {
    axios.defaults.timeout = 10000;
    dispatch(setSettingsLoading(true))

    axios
        .put("https://modtree-api.netlify.app/.netlify/functions/user/account", userData)
        .then(res => {
           dispatch(setUserSettings(res.data.updated))})
        .then(res => {
            dispatch({
                        type: GET_SUCCESS,
                        payload: "Saved successfully!"
            });
            dispatch(setSettingsLoading(false));
            if(currIsEditing) {
                dispatch(setEditAll(false, currIsEditing, editCategory))
            }
    })
        .catch(err => {
                dispatch(setSettingsLoading(false));
                console.log(err);
                history.push("/500-error");
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

export const setDegreeOptions = (history) => dispatch => {
    axios.defaults.timeout = 10000;
    axios.all([
        axios.get('https://modtree-api.netlify.app/.netlify/functions/info/bachelors'),
        axios.get('https://modtree-api.netlify.app/.netlify/functions/info/secondMajors'),
        axios.get('https://modtree-api.netlify.app/.netlify/functions/info/minors'),
        axios.get('https://modtree-api.netlify.app/.netlify/functions/info/residences')
    ])
    .then(resArr => {
            dispatch(setAcadOptions(resArr[0].data, resArr[1].data, resArr[2].data, resArr[3].data));
        }) 
    .catch(err => {
        console.log(err)
        history.push('/500-error');
    });
}

export const setAcadOptions = (bachelors, secondMajors, minors, residences) => {
    return {
        type: SET_ACAD_OPTIONS,
        bachelors,
        secondMajors,
        minors, 
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

export const setFirstRender = (status) => {
    return {
        type: SET_FIRST_RENDER,
        status
    }
}