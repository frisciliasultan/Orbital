import {
    GET_SUCCESS,
    REMOVE_SUCCESS
} from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_SUCCESS:
            return action.payload;

        case REMOVE_SUCCESS:
            return initialState;
            
        default:
            return state;
    }
}