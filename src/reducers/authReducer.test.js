import {
    SET_CURRENT_USER,
    USER_LOADING,
    USER_REGISTERED
  } from "../actions/types";
import authReducer, { initialState } from './authReducer';
import { setCurrentUser } from '../actions/authActions';

describe('Auth Reducer', () => {
    it('should return default state', () => {
        const newState = authReducer(undefined, {type: 'unexpected'});
        expect(newState).toEqual(initialState);
    });

    it('should return new state if receiving type', () => {
        const action = setCurrentUser({}, true, false);
        const newState = authReducer(undefined, action);
        expect(newState).toEqual()
    })
})