import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SignoutButton from './';

configure({ adapter: new Adapter() });

const props = {
    handleLogin: jest.fn(),
    history:     {},
};

const result = mount(<SignoutButton { ...props } />);

describe('SignoutButton component', () => {
    test(`should have 1 'button' element`, () => {
        expect(result.find('button')).toHaveLength(1);
    });

    test(`handleLogin method should be a function and passed in props`, () => {
        expect(typeof result.props().handleLogin).toBe('function');
    });

    test(`history should be an array and passed in props`, () => {
        expect(typeof result.props().history).toBe('object');
    });

    test(`'button' element should have 'Sign out' label`, () => {
        expect(result.find('button').text()).toBe('Sign out');
    });
});
