import React from 'react';
import dom from 'react-test-renderer';
import Spam from './';

const renderTree = dom.create(<Spam />).toJSON();

describe('Spam component', () => {
    test('Spam component should correspond to its snapshot counterpart', () => {
        expect(renderTree).toMatchSnapshot();
    });
});
