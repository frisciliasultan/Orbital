import moxios from 'moxios';
import { testStore } from '../utils/testing';
import { loginUser } from '../actions/authActions';

describe('loginUser action', () => {
    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    })

    test('Store is updated correctly', () => {
        const expectedState = { token: '12dafn32o412o'};
        const store = testStore;
        
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                data: expectedState
            })
        });
        console.log(store)
        return store.dispatch(loginUser())
        .then(() => {
            const newState = store.getState();
            expect(newState.posts).toBe(expectedState);
        })
    })
})