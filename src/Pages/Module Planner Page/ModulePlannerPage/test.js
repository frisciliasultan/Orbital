import ModulePlannerPage from './index';
import { shallow } from 'enzyme';
import { findByTestAttribute, testStore } from '../../../utils/testing';
import React from 'react';

const setUp = (initialState={}) => {
    const store = testStore(initialState);
    const wrapper = shallow(<ModulePlannerPage store={store} />).childAt(0).dive();
    return wrapper;
};

describe('ModulePlannerPage Component', () => {
    let wrapper;
    beforeEach(() => {
        const initialState = {
            modplan: {
                modules: [{
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
                }]
            }
        }

        wrapper = setUp(initialState);
    })

    it('should render without errors', () => {
        const component = findByTestAttribute(wrapper, 'modulePlannerComponent');
        expect(component.length).toBe(1);
    })
})
