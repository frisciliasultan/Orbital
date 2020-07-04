import {
    REMOVE_SUCCESS
} from "./types";

// import isEmpty from "is-empty";

export const removeSuccess = (success) => {
    return {
        type: REMOVE_SUCCESS,
    }
}