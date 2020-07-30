import React from 'react';
import App from './App';
import combineReducers from './reducers';
import { shallow, mount } from 'enzyme';
import { findByTestAttribute, testStore, testRender } from './utils/testing';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { authInitialState } from './reducers/authReducer';
import { settingsInitialState } from './reducers/settingsReducer';

const setUp = (initialState, method) => {
    const store = testStore(initialState);
    let wrapper;
    if(method === 'shallow') {
        wrapper = shallow(<App store={store}/>).childAt(0).dive();
    } else {
        wrapper = mount(
            <Provider store={store}>
                <Router>
                    <App />
                </Router>
            </Provider>
        );
    }
    return wrapper;
};

describe('App component', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = setUp({}, 'shallow');
    });

    it('should render without errors', () => {
        const component = findByTestAttribute(wrapper, 'appComponent');
        expect(component.length).toBe(1);
    })
});

describe('Unauthorised access', () => {
    let wrapper;
    beforeAll(() => {
        wrapper = setUp({}, 'mount');
    });
    describe('should not display if not logged in', () => {
        it('should not display private navbar', () => {
            testRender(wrapper, 'privateNavBarComponent', 0);
        });
    
        it('should not display module planner page', () => {
            testRender(wrapper, 'modulePlannerPageComponent', 0);
        });
    
        it('should not display cap calculator page', () => {
            testRender(wrapper, 'capCalculatorPageComponent', 0);
        });
    
        it('should not display academics settings page', () => {
            testRender(wrapper, 'acadSettingsPageComponent', 0);
        });
    
        it('should not display account settings page', () => {
            testRender(wrapper, 'accountSettingsPageComponent', 0);
        });
    });
    
    describe('should display if not logged in', () => {
        it('should display public navbar', () => {
            testRender(wrapper, 'publicNavBarComponent', 1);
        });
    
        it('should display login page', () => {
            testRender(wrapper, 'loginPageComponent', 1);
        });
    });
});

describe('Authorised access after first register before filling in settings', () => {
    let wrapper;
    beforeEach(() => {
        const authorisedState = {
            auth: {
                ...authInitialState,
                isAuthenticated: true,
                firstTimeRegistered: true
            }
        }
        wrapper = setUp(authorisedState, 'mount');
    });

    describe('should display when first time registering', () => {
        it('should display private navbar', () => {
            testRender(wrapper, 'privateNavBarComponent', 1);
        });

        it('should display academics settings page', () => {
            testRender(wrapper, 'acadSettingsPageComponent', 1);
        });
    });

    describe('should not display when first time registering', () => {
        it('should not display public navbar', () => {
            testRender(wrapper, 'publicNavBarComponent', 0);
        });

        it('should not display module planner page', () => {
            testRender(wrapper, 'modulePlannerPageComponent', 0);
        });
    
        it('should not display cap calculator page', () => {
            testRender(wrapper, 'capCalculatorPageComponent', 0);
        });
    
        it('should not display account settings page', () => {
            testRender(wrapper, 'accountSettingsPageComponent', 0);
        });

        it('should not display login page', () => {
            testRender(wrapper, 'loginPageComponent', 0);
        });
    });
});

describe('Authorised access after settings is filled', () => {
    let wrapper;
    beforeEach(() => {
        const authorisedState = {
            auth: {
                ...authInitialState,
                isAuthenticated: true,
            },
            settings: {
                ...settingsInitialState,
                userInfo: {
                    major: {
                        name: 'Bachelor of Computer Science',
                        tag: 'primary_major_computer_science'
                    }
                }
            }
        }
        wrapper = setUp(authorisedState, 'mount');
    });

    describe('should display after settings is filled', () => {
        it('should display private navbar', () => {
            testRender(wrapper, 'privateNavBarComponent', 1);
        });

        it('should display academics settings page', () => {
            testRender(wrapper, 'acadSettingsPageComponent', 1);
        });
    });

    describe('should not display after settings is filled', () => {
        it('should not display public navbar', () => {
            testRender(wrapper, 'publicNavBarComponent', 0);
        });

        it('should not display module planner page', () => {
            testRender(wrapper, 'modulePlannerPageComponent', 0);
        });
    
        it('should not display cap calculator page', () => {
            testRender(wrapper, 'capCalculatorPageComponent', 0);
        });
    
        it('should not display account settings page', () => {
            testRender(wrapper, 'accountSettingsPageComponent', 0);
        });

        it('should not display login page', () => {
            testRender(wrapper, 'loginPageComponent', 0);
        });
    });
});