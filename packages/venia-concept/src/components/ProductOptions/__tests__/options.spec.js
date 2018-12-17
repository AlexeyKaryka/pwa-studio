import React from 'react';
import { shallow } from 'enzyme';

import Options from '../options';
import Option from '../option';

const mockProps = {
    options: [1,2]
}

test('renders correctly', () => {
    const wrapper = shallow(<Options {...mockProps} />);

    expect(wrapper.find(Option)).toHaveLength(mockProps.options.length);
})
