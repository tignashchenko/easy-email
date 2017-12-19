import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SignoutButton from './';

configure({ adapter: new Adapter() });

const result = mount(<SignoutButton />);

describe('SignoutButton component', () => {
    test(`should have 1 'button' element`, () => {
        expect(result.find('button')).toHaveLength(1);
    });
});
