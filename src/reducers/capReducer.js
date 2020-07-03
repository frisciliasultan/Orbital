import {
    SET_SEMESTER_OPTIONS,
    CALCULATE_CAP,
    CLEAN_UP_CAP,
    SET_CAP
} from "../actions/types";

const initialState = {
    cap: 5,
    targetCap: 5,
    semesterOptions: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_SEMESTER_OPTIONS: 
            let sem1;
            let sem2;
            let semesterOptions = [];

            for(let i = 1; i < (action.payload * 2); i += 2) {
                const year = Math.ceil(i / 2);
                sem1 = `Year ${year} Semester 1`;
                sem2 = `Year ${year} Semester 2`;
                semesterOptions[i - 1] = sem1;
                semesterOptions[i] = sem2;
            }

            return {
                ...state,
                semesterOptions: semesterOptions
            }
        
        case CALCULATE_CAP:
            let totalMC = 0;
            let totalGradePoint = 0;
            let totalTargetMC = 0;
            let totalTargetGradePoint = 0;

            for(let i = 0; i < action.payload.length; i ++) {
                const module = action.payload[i];
                const MC = Number(module.moduleCredit);
                if(module.grade && !module.SU) {
                    totalGradePoint += (module.gradePoint * MC);
                    totalMC += MC;
                    totalTargetGradePoint += (module.gradePoint * MC);
                    totalTargetMC += MC;
                } else if (module.targetGrade) {
                    totalTargetGradePoint += (module.gradePoint * MC);
                    totalTargetMC += MC;
                   
                }
            }
          
            const cap = totalMC === 0 ? 5 : totalGradePoint / totalMC;
            const roundedCap = Math.round((cap + Number.EPSILON) * 100) / 100;
            const targetCap = totalTargetMC === 0 ? 5 : totalTargetGradePoint / totalTargetMC;
            const roundedTargetCap = Math.round((targetCap + Number.EPSILON) * 100) / 100;

            return {
                ...state,
                cap: roundedCap,
                targetCap: roundedTargetCap
            }
    
        case SET_CAP:
            return {
                ...state,
                cap: action.cap,
                targetCap: action.targetCap
            }

        case CLEAN_UP_CAP:
            return initialState;

        default: 
            return state;
    }
}

