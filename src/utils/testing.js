import { createStore, applyMiddleware } from "redux";
import rootReducers from "../reducers";
import { middleware } from "../store";
import { composeWithDevTools } from "redux-devtools-extension";

export const findByTestAttribute = (component, attr) => {
    const wrapper = component.find(`[data-test='${attr}']`);
    return wrapper;
}

export const testStore = (initialState) =>  {
    const store = createStore(
        rootReducers,
        initialState,
        composeWithDevTools(applyMiddleware(...middleware))
    );
    return store;
}

export const testRender = (wrapper, component, length) => {
    const toRender = findByTestAttribute(wrapper, component);
    expect(toRender.length).toBe(length);
}