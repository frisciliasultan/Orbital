import { createStore, applyMiddleware } from "redux";
import rootReducers from "../reducers";
import { middleware } from "../store";
import { initialState } from "../reducers/authReducer";

export const findByTestAttribute = (component, attr) => {
    const wrapper = component.find(`[data-test='${attr}']`);
    return wrapper;
}

export const testStore = (initialState) =>  {
    const store = createStore(
        rootReducers,
        initialState,
        applyMiddleware(...middleware)
    );
    return store;
}