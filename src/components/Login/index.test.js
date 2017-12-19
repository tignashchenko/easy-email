import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Login from './';

configure({ adapter: new Adapter() });

const state = {
    attemptedUserId:   '',
    attemptedPassword: '',
};

const newState = {
    attemptedUserId:   'tignashchenko',
    attemptedPassword: 'asdf1234',
};

const props = {
    handleLogin: jest.fn(),
    password:    'asdf1234',
    userId:      'tignashchenko',
};

const result = mount(<Login { ...props } />);

describe('Login component', () => {
    test(`should have 8 'div' elements`, () => {
        expect(result.find('div')).toHaveLength(8);
    });

    test(`should have 1 'form' element`, () => {
        expect(result.find('form')).toHaveLength(1);
    });

    test(`should have 3 'input' elements`, () => {
        expect(result.find('input')).toHaveLength(3);
    });

    test(`should have a valid initial state`, () => {
        expect(result.state()).toEqual(state);
    });

    test(`should respond to changes in state correctly`, () => {
        result.setState(() => ({
            attemptedUserId:   props.userId,
            attemptedPassword: props.password,
        }));

        expect(result.state()).toEqual(newState);

        result.setState(() => ({
            attemptedUserId:   '',
            attemptedPassword: '',
        }));

        expect(result.state()).toEqual(state);
    });

    test(`input value for user id and state should reflect changes correctly`, () => {
        result.find('#userId').simulate('change', {
            target: {
                value: props.userId,
            },
        });

        result.find('#password').simulate('change', {
            target: {
                value: props.password,
            },
        });

        expect(result.state()).toEqual(newState);
    });
});
