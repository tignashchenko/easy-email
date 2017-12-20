import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './';

configure({ adapter: new Adapter() });

const result = shallow(<App />);

describe('App component', () => {
    test(`should have 1 'BrowserRouter' component`, () => {
        expect(result.find('BrowserRouter')).toHaveLength(1);
    });

    test(`should have 10 'Route' components`, () => {
        expect(result.find('Route')).toHaveLength(10);
    });

    test(`'Route' components should not have any children`, () => {
        expect(result.find('Route').children()).toHaveLength(0);
    });
});
