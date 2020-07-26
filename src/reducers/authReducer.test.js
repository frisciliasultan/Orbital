import {
    SET_CURRENT_USER,
    USER_LOADING,
    USER_REGISTERED
  } from "../actions/types";
import authReducer, { authInitialState } from './authReducer';
import { setCurrentUser } from '../actions/authActions';

describe('Auth Reducer', () => {
    it('should return default state', () => {
        const newState = authReducer(undefined, {type: 'unexpected'});
        expect(newState).toEqual(authInitialState);
    });

    it('should return new state if it receives type SET_CURRENT_USER from local login with unexpired token'
        , () => {
            const mockDecodedToken = {
                                        id: "58ai47124nfa93421ud0sn",
                                        name: "test",
                                        email: "test@test.com",
                                        iat: 155919348190,
                                        exp: 1387419413,
                                    };
            const expectedState = {
                                    ...authInitialState, 
                                    isAuthenticated: true, 
                                    user: mockDecodedToken,
                                    socialLogin: false,
                                    firstTimeRegistered: true 
                                };
            const action = setCurrentUser(mockDecodedToken, true, false);
            const newState = authReducer(authInitialState, action);
            expect(newState).toEqual(expectedState);
        }
    )
})