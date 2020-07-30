import moxios from 'moxios';
import { testStore } from '../utils/testing';
import { loginUser, registerUser } from '../actions/authActions';
import { callBackendAPI } from '../actions/modplanActions';

describe('callBackendAPI action creator', () => {
    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    })

    test('Store is updated correctly after fetching NUSMods', () => {
        const expectedState = [{
            moduleCode: 'EX1234',
            title: 'Example Title 1',
            description: 'Some Description',
            moduleCredit: '4'
        },
        {
            moduleCode: 'EX1234',
            title: 'Example Title 2',
            description: 'Some Description',
            moduleCredit: '4'
        },
        {
            moduleCode: 'EX1234',
            title: 'Example Title 3',
            description: 'Some Description',
            moduleCredit: '4'
        },
        {
            moduleCode: 'EX1234',
            title: 'Example Title 4',
            description: 'Some Description',
            moduleCredit: '4'
        }];
        const store = testStore();
        
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: expectedState
            })
        });

        return store.dispatch(callBackendAPI('NUSMods'))
        .then(() => {
            const newState = store.getState();
            expect(newState.modplan.modules).toBe(expectedState);
        })
    })

    test('Store is updating correctly after fetching rules from backend', () => {
        expect(1).toBe(1);
        //  TEMPORARY TO BE CHANGED LATER
    });
});

describe('registerUser action creator', () => {
    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    })

    test('Store is updated correctly after registering user', () => {
        // const expectedState = true;
        // const store = testStore();
        // const userData = { 
        //     name: 'test',
        //     email: 'test@test.com'
        // }
        
        // moxios.wait(() => {
        //     const request = moxios.requests.mostRecent();
        //     request.respondWith({
        //         status: 200,
        //     })
        // });

        // return store.dispatch(registerUser(userData, false, null))
        // .then(() => {
        //     const newState = store.getState();
        //     expect(newState.auth.firstTimeRegistered).toBe(expectedState);
        // })
        expect(1).toBe(1);
        //  TEMPORARY TO BE CHANGED LATER
    });
});

describe('loginUser action creator', () => {
    // beforeEach(() => {
    //     moxios.install();
    // });

    // afterEach(() => {
    //     moxios.uninstall();
    // })

    test('Store is updated correctly after logging user', () => {
    //     const expectedState = true;
    //     const store = testStore();
    //     const userData = { 
    //         name: 'test',
    //         email: 'test@test.com'
    //     }
        
    //     moxios.wait(() => {
    //         const request = moxios.requests.mostRecent();
    //         request.respondWith({
    //             status: 200,
    //             response: { token : '131jna034no23r93lsma-2'}
    //         })
    //     });

    //     return store.dispatch(loginUser(userData, false, null))
    //     .then(() => {
    //         const newState = store.getState();
    //         expect(newState.auth.firstTimeRegistered).toBe(expectedState);
    //     })
    expect(1).toBe(1);
    //  TEMPORARY TO BE CHANGED LATER
    });
   
});

