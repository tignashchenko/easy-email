import React from 'react';
import dom from 'react-test-renderer';
import AllMail from './';

const renderTree = dom.create(<AllMail />).toJSON();

test('AllMail component should correspond to its snapshot counterpart', () => {
    expect(renderTree).toMatchSnapshot();
});
