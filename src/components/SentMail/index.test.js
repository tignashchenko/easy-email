import React from 'react';
import dom from 'react-test-renderer';
import SentMail from './';

const renderTree = dom.create(<SentMail />).toJSON();

test('SentMail component should correspond to its snapshot counterpart', () => {
    expect(renderTree).toMatchSnapshot();
});
