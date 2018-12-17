import React from 'react';
import { shallow } from 'enzyme';

import Quantity from '../quantity';
import Select from 'src/components/Select';

test('renders correctly', () => {
    const wrapper = shallow(
        <Quantity />
    ).dive();
    expect(wrapper.find(Select)).toHaveLength(1);
});
