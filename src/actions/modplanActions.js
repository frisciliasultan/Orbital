import axios from 'axios';
import {
    SET_BOARD_FILLED,
    SET_MODULES,
    SET_RULES,
    SET_CALL_BACKEND_NOW,
    SET_SELECTED_MODULES,
    SET_MODULE_LOCATION,
    SET_CURRRENT_SEMESTER,
    SET_MODPLAN_LOADING,
    CLEAN_UP_MODPLAN
} from './types';
import setAuthToken from '../utils/setAuthToken';
import compile from "../backend_utils/compile";
import toView from "../backend_utils/toView";

// const compile = require('../backend_utils/compile');
// const toView = require('../backend_utils/toView');

export const setIsBoardFilled = () => {
    return {
        type: SET_BOARD_FILLED,
    }
}

export const callBackendAPI = (backend, modplanObj, history) => async dispatch => {

    if(backend === 'NUSMods') {
        setAuthToken(false);
        axios.get('https://api.nusmods.com/v2/2020-2021/moduleInfo.json' )
        .then(res => dispatch(setModules(res.data)))
        .then(setAuthToken(localStorage.jwtToken))
        .catch(err => {
            console.log(err)
        });
        
    } else {
        dispatch(setModPlanLoading(true));
        const modplan = modplanObj.map((obj) => {
            return obj.moduleCode
        });
        try {
            const ruleList = await axios.get('https://modtree-api.netlify.app/.netlify/functions/user/directory');
            const ruleData = await Promise.all(ruleList.data.list.map((ruleTag) => {
                return axios
                    .get('https://modtree-api.netlify.app/.netlify/functions/rules/assemble/' + ruleTag)
                    .then(res => {
                        if(res.status !== 200) {
                            throw Error (res.message);
                        }
                        return res.data    
                    })
                    .then(res => {
                        return compile(res);
                    })

            }));
            const evaluatedRules = await evalRules(ruleData, modplan);
            dispatch(setRules(evaluatedRules));
            dispatch(setModPlanLoading(false));
            return ruleData;
        } catch(err) {
            dispatch(setModPlanLoading(false));
            console.log(err);
            history.push("/500-error");
        };
    }
    
}

export const evalRules = (ruleData, modplan) => {
    return Promise.all(ruleData.map((asyncFunc) => {
        return asyncFunc({modules: modplan})
            .then(res => toView(res))
    }));
}

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

export const setModPlanLoading = (status) => {
    return {
        type: SET_MODPLAN_LOADING,
        status
    }
}
export const cleanUpModPlan = () => {
    return { 
        type: CLEAN_UP_MODPLAN
    }
}