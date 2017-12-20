import React from 'react';
import dom from 'react-test-renderer';
import Signup from './';

const renderTree = dom.create(<Signup />).toJSON();

describe('Signup component', () => {
    test('Signup component should correspond to its snapshot counterpart', () => {
        expect(renderTree).toMatchSnapshot();
    });
});
