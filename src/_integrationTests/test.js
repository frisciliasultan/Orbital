import moxios from 'moxios';
import { testStore } from '../utils/testing';
import { loginUser } from '../actions/authActions';
import { setModules, callBackendAPI } from '../actions/modplanActions';

describe('loginUser action', () => {
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
})