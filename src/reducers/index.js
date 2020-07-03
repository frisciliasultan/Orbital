import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import successReducer from "./successReducer";
import modplanReducer from "./modplanReducer";
import capReducer from "./capReducer";
import settingsReducer from "./settingsReducer";

export default combineReducers ({
    auth: authReducer,
    errors: errorReducer,
    success: successReducer,
    modplan: modplanReducer,
    cap: capReducer,
    settings: settingsReducer
});
