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
} from "../actions/types";

const initialState = {
    selectedModules: [], 
    callBackendNow: false,
    rules: [],
    modules: [],
    loading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_BOARD_FILLED: 
            return {
                ...state,
                selectedModules: true
            }
            
        case SET_MODULES: 
            return {
                ...state,
                modules: action.payload
        }
        case SET_RULES: 
            return {
                ...state,
                rules: action.payload
        }

        case SET_CALL_BACKEND_NOW:
            return {
                ...state,
                callBackendNow: action.payload
            }
        
        case SET_SELECTED_MODULES:
            let unique = true;
            let indexOfDuplicate;
            const module = [...action.currentSelectedModules];
            const { moduleAdded } = action;
            
            if(!moduleAdded) {
                return {
                    ...state,
                    selectedModules: module
                }
            }
            for(let i = 0; i < module.length; i++) {
                if(module[i].moduleCode === moduleAdded.moduleCode) {
                    unique = false;
                    indexOfDuplicate = i;
                    break;
                }
            }

            if (!module.includes(moduleAdded)) {
                if(unique) {
                    module.push(moduleAdded);
                } else {
                    module.splice(indexOfDuplicate, 1, moduleAdded);         
                }
            }

            return {
                ...state, 
                selectedModules: module
            }

        case SET_MODULE_LOCATION: 
            const { item, location, AY } = action;
            const modulesToFilter = action.modules
            let changedModule;

            if(!location) {
                changedModule = modulesToFilter.filter((object) => object.moduleCode !== item.id);
            } else {
                const temp = modulesToFilter.filter((object) => object.moduleCode === item.id);
                const moduleToChange = [...temp];
                moduleToChange[0].location =  location;
                moduleToChange[0].AY = AY;
                changedModule = modulesToFilter.filter((object) => object.moduleCode !== item.id).concat(moduleToChange)
            }
           
            return {
                ...state,
                selectedModules: changedModule
            }
        
        case SET_CURRRENT_SEMESTER:
           return {
               ...state,
               AY: action.AY,
               semester: action.semester
           }
        case SET_MODPLAN_LOADING:
            return {
                ...state,
                loading: action.status
            }
        case CLEAN_UP_MODPLAN:
            return initialState;

        default:
            return state
    }
}

