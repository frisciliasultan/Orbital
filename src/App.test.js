import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import App from './App';

let mockedStore = configureStore([])({});

test('renders learn react link', () => {
  const wrapper = mount(<SomeComponent foo="bar" />, {
    context: { store: mockedStore },
    childContextTypes: { store: PropTypes.object.isRequired }
  });
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
