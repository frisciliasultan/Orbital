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
            let { moduleAdded } = action;
            
            if(!moduleAdded) {
                return {
                    ...state,
                    selectedModules: module
                }
            }

            if(!Array.isArray(moduleAdded)) {
                moduleAdded = [moduleAdded];
            }

            moduleAdded.map((object, i) => {
                for(let i = 0; i < module.length; i++) {
                    if(module[i].moduleCode === object.moduleCode) {
                        unique = false;
                        indexOfDuplicate = i;
                        break;
                    }
                }

                if (!module.includes(object)) {
                    if(unique) {
                        module.push(object);
                    } else {
                        module.splice(indexOfDuplicate, 1, object);         
                    }
                }
            })

            return {
                ...state, 
                selectedModules: module
            }

        case SET_MODULE_LOCATION: 
            let { item, location, AY } = action;
            const modulesToFilter = action.modules
            let changedModule = [];

            if(!location) {
                if(!Array.isArray(item)) {
                    item = [item];
                }
                changedModule = [...modulesToFilter];
                item.map((item, i) => {
                    const toCompare = item.id ? item.id : item.moduleCode
                    changedModule = changedModule.filter((object) => object.moduleCode !== toCompare);
                });
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

