import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('App component', () => {
  it('should render without errors', () => {
    const wrapper = shallow(<App />);
    console.log(wrapper.debug());
    // const mainContainer = wrapper.find('.main-container');
    // expect(mainContainer.length).toBe(1);

  })
})