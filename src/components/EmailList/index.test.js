import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import EmailList from './';

configure({ adapter: new Adapter() });

const props = {
    emails:           [],
    handleSelections: jest.fn(),
    toggleImportant:  jest.fn(),
    toggleRead:       jest.fn(),
};

const result = mount(<EmailList { ...props } />);

describe('EmailList component', () => {
    test(`should have 1 'div' element`, () => {
        expect(result.find('div')).toHaveLength(1);
    });

    test(`emails prop should be an array`, () => {
        expect(Array.isArray(result.props().emails)).toBe(true);
    });

    test(`methods passed in props should be functions`, () => {
        expect(typeof result.props().handleSelections).toBe('function');
        expect(typeof result.props().toggleImportant).toBe('function');
        expect(typeof result.props().toggleRead).toBe('function');
    });
});
