import React from 'react';
import dom from 'react-test-renderer';
import Important from './';

const renderTree = dom.create(<Important />).toJSON();

test('Important component should correspond to its snapshot counterpart', () => {
    expect(renderTree).toMatchSnapshot();
});
