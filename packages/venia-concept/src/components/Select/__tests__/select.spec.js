import React from 'react';
import { shallow } from 'enzyme';
import { Select as SelectInformed, Option } from 'informed';
import Select from '../select';

const mockProps = {
    field: 'field',
    items: [{
            label: 'label',
            value: 'value'
        },{
            label: 'label',
            value: 'value'
        }
    ]
}

test('renders correctly', () => {
    const wrapper = shallow(
        <Select {...mockProps} />
    ).dive();

    expect(wrapper.find(SelectInformed)).toHaveLength(1);
    expect(wrapper.find(SelectInformed).dive().find(Option)).toHaveLength(mockProps.items.length);
});


