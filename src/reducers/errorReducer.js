import { 
    GET_ERRORS,
    CLEAN_UP_ERRORS
} from "../actions/types";

const initialState = {
    login: {}, 
    register: {}
};

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_ERRORS:
            return {
                ...state,
                [action.source]: action.payload
            };
        case CLEAN_UP_ERRORS:
            return initialState;
        default:
            return state;
    }
}