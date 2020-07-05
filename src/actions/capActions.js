import {
    CALCULATE_CAP,
    SET_SEMESTER_OPTIONS,
    CLEAN_UP_CAP,
    SET_CAP
} from "./types";

export const calculateCAP = (selectedModules) => {
    return {
        type: CALCULATE_CAP,
        payload: selectedModules
    }
}

export const setCAP = (cap, targetCap) => {
    return {
        type: SET_CAP,
        cap,
        targetCap

    }
}

export const setSemesterOptions = (matYear, gradYear) => {
    return {
        type: SET_SEMESTER_OPTIONS,
        matYear,
        gradYear
    }
}

export const cleanUpCAP = () => {
    return { 
        type: CLEAN_UP_CAP
    }
}
