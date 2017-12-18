import React from 'react';
import dom from 'react-test-renderer';
import Drafts from './';

const renderTree = dom.create(<Drafts />).toJSON();

test('Drafts component should correspond to its snapshot counterpart', () => {
    expect(renderTree).toMatchSnapshot();
});
