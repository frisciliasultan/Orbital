import React from 'react';
import { shallow } from 'enzyme';
import { PublicNav } from './index';
import { findByTestAttribute } from "../../../utils/testing";

const setUp = (props={}) => {
    const component = shallow(<PublicNav />);
    return component;
}

describe('Public Nav component', () => {
    let component;
    beforeEach(() => {
        component = setUp();
    })

    it('should render without errors', () => {
        const navbar = findByTestAttribute(component, 'navbar');
        expect(navbar.length).toBe(1);
    });

    it('should render a logo', () => {
        const navbrand = findByTestAttribute(component, 'navbrand');
        expect(navbrand.length).toBe(1);
    })
})