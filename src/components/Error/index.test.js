import React from 'react';
import dom from 'react-test-renderer';
import Error from './';

const renderTree = dom.create(<Error />).toJSON();

test('Error component should correspond to its snapshot counterpart', () => {
    expect(renderTree).toMatchSnapshot();
});
