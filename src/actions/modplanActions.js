import axios from 'axios';
import {
    SET_BOARD_FILLED,
    SET_MODULES,
    SET_RULES,
    SET_CALL_BACKEND_NOW,
    SET_SELECTED_MODULES,
    SET_MODULE_LOCATION,
    SET_CURRRENT_SEMESTER,
    CLEAN_UP_MODPLAN
} from './types';
import setAuthToken from '../utils/setAuthToken';



export const setIsBoardFilled = () => {
    return {
        type: SET_BOARD_FILLED,
    }
}

export const callBackendAPI = (backend, ulrTag, degreeTag) => dispatch => {

    if(backend === 'NUSMods') {
        setAuthToken(false);

        axios.get('s://api.nusmods.com/v2/2018-2019/moduleInfo.json' )
        .then(res => dispatch(setModules(res.data)))
        .then(setAuthToken(localStorage.jwtToken))
        .catch(err => {
            console.log(err)
        });
        
    } else {
        axios.all([
            axios.get('http://172.19.162.53:3000/rules/' + ulrTag),
            axios.get('http://172.19.162.53:3000/rules/' + degreeTag)
        ])
        .then(resArr => {
                dispatch(setRules([resArr[0].data, resArr[1].data]));
            }) 
        .catch(err => {
            console.log(err)
        });
    }
    
}

//AXIOS CALL BUT IT DOESNT WORK -- FOR FUTURE REFERENCE
// export const callBackendAPI = () => dispatch => {

//     const headers = { headers: {'accept': 'application/json'}}
//     axios.all([
//         axios.get('https://api.nusmods.com/v2/2018-2019/moduleInfo.json', headers),
//         axios.get('http://172.19.162.53:3000/rules/r_cs_degree')
//     ])
//     .then(resArr => {
//         dispatch(setModules(resArr[0]));
//         dispatch(setRules(resArr[1].data));
//     }) 
//     .catch(err => {
//         console.log(err)
//     });
// }

export const setModules = (modules) => {
    return {
        type: SET_MODULES,
        payload: modules
    }
}

export const setRules = (rules) => {
    return {
        type: SET_RULES,
        payload: rules
    }
}

export const setCallBackendNow = (status) => {
    return {
        type: SET_CALL_BACKEND_NOW,
        payload: status
    }
}

export const setSelectedModules = (object, selectedModules) => {
    return { 
        type: SET_SELECTED_MODULES,
        moduleAdded: object,
        currentSelectedModules: selectedModules
    }
}

export const setModuleLocation = (item, location, AY, selectedModules) => {
    return { 
        type: SET_MODULE_LOCATION,
        item,
        location,
        AY,
        modules: selectedModules
    }
}

export const setCurrentSemester = (AY, semester) => {
    return {
        type: SET_CURRRENT_SEMESTER,
        AY,
        semester
    }
}

export const cleanUpModPlan = () => {
    return { 
        type: CLEAN_UP_MODPLAN
    }
}