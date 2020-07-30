import {
    SET_USER_SETTINGS,
    SET_CURRENT_SEMESTER,
    SET_MATRICULATION_OPTIONS,
    SET_TARGET_GRAD_OPTIONS,
    CLEAN_UP_SETTINGS,
    SET_ACAD_OPTIONS,
    SET_EDIT_ALL,
    SET_FIRST_RENDER,
    SETTINGS_LOADING
} from "../actions/types";

export const settingsInitialState = {
    currentAY: null,
    currentSemester: null,
    month: null,
    bachelorOptions: [],
    secondMajorOptions: [],
    minorOptions: [],
    residenceOptions: [],
    matriculationOptions:[],
    targetGradOptions: [],
    userInfo: {},
    isEditing: {},
    isLoading: false,
    firstRender: true
}

export default function (state = settingsInitialState, action ) {
    switch(action.type) {
        case SET_USER_SETTINGS:
            return {
                ...state,
                userInfo: action.payload
            }
        
        case SET_CURRENT_SEMESTER:
            return {
                ...state,
                currentAY: action.currentAY,
                currentSemester: action.currentSemester,
                month: action.month
            }
        
        case SET_MATRICULATION_OPTIONS:
            const { currentAY, currentSemester } = action;
            const year = Number(currentAY.substr(5,4));
            let matriculationOptions = [];
            let value;

            if(currentSemester === "Semester 1") { 
                for(let i = 0; i <= 6; i++) {
                    const start = year - i;
                    const end = start + 1;

                    if(i === 0) {
                        value = `AY ${start}/${end} (Next Year)`
                    } else {
                        value = `AY ${start}/${end} (Year ${i})`
                    }

                    matriculationOptions[i] = value;
                }
            } else {
                for(let i = 0; i <= 6; i++ ) {
                    const start = year - i;
                    const end = start + 1;

                    if(i === 0) {
                        value = `AY ${start}/${end} (Next Semester)`
                    }
                    else {
                        value = `AY ${start}/${end} (Year ${i})`
                    }
                    
                    matriculationOptions[i] = value;
                }
            }

            return{
                ...state,
                matriculationOptions: matriculationOptions    
            }
        
        case SET_TARGET_GRAD_OPTIONS:
            const { AY, Semester } = action;
            const Year = Number(AY.substr(0,4));
            let targetGradOptions = []
            let option;

            for(let i = 0; i <= 6; i++) {
                const start = Year + i;
                const end = start + 1;

                if(i === 0) {
                    option = `In AY ${AY} (This Year)`
                } else if (i === 1) {
                    option = `In AY ${start}/${end} (Next Year)`
                } else {
                    option = `In AY ${start}/${end} (In ${i} Years)`
                }
                targetGradOptions[i] = option;
            }

            return{
                ...state,
                targetGradOptions: targetGradOptions    
            }
        
        case SET_ACAD_OPTIONS:
            const { bachelors, secondMajors, minors, residences } = action;
            return {
                ...state,
                bachelorOptions: bachelors,
                secondMajorOptions: secondMajors,
                minorOptions: minors,
                residenceOptions: residences
            }
        
        case SET_EDIT_ALL:
            const { status, current, category } = action;

            const updated = {...current};
            updated[category] = status;
            return {
                ...state,
                isEditing: updated
            }
        
        case SETTINGS_LOADING:
            return {
                ...state,
                isLoading: action.payload
            }
        
        case SET_FIRST_RENDER:
            return {
                ...state,
                firstRender: action.status
            }
        case CLEAN_UP_SETTINGS:
            return settingsInitialState;

        default:
            return state;
    }
}
