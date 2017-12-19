import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Email from './';

configure({ adapter: new Adapter() });

const isSelected = false;

const props = {
    email: {
        isSelected,
    },
    handleSelections: jest.fn(),
    toggleImportant:  jest.fn(),
    toggleRead:       jest.fn(),
};

const result = mount(<Email { ...props } />);

describe('Email component', () => {
    test(`should have 5 'div' elements`, () => {
        expect(result.find('div')).toHaveLength(5);
    });

    test(`should have 1 'input' checkbox element`, () => {
        expect(result.find('input')).toHaveLength(1);
    });

    test(`'email' prop should be an object`, () => {
        expect(typeof result.props().email).toBe('object');
    });

    test(`changes in 'input' checkbox should be reflected accordingly`, () => {
        expect(result.find('input').simulate('change', {
            checked: isSelected,
        }));
    });

    test(`svg image should be an object`, () => {
        expect(typeof result.find('MdStarOutline')).toBe('object');
    });

    test(`methods passed in props should be functions`, () => {
        expect(typeof result.props().handleSelections).toBe('function');
        expect(typeof result.props().toggleImportant).toBe('function');
        expect(typeof result.props().toggleRead).toBe('function');
    });
});
