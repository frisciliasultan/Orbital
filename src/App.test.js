// import React from 'react';
// import ReactDOM from 'react-dom';
// import { render } from '@testing-library/react';
// import App from './App';
import { total } from "./addTesting";

const add = jest.fn(() => 3);

// const add = require('./addTesting');
test('Fake Test', () => {
  expect(true).toBeTruthy();
})

test('Truthy Test', () => {
  expect(true).toBeTruthy();
})

test('<Add>', () => {
  expect(add(1,2)).toBe(3);
  expect(add(3,5)).toBe(3);
  expect(add).toHaveBeenCalledTimes(2);
  expect(add).toHaveBeenCalledWith(1,2);
})

// test('total', () => {
//   expect(total(5, 20)).toBe('$25');
// })

