import React from 'react';
import dom from 'react-test-renderer';
import Trash from './';

const renderTree = dom.create(<Trash />).toJSON();

test('Trash component should correspond to its snapshot counterpart', () => {
    expect(renderTree).toMatchSnapshot();
});
