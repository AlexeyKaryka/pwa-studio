import React from 'react';
import { shallow } from 'enzyme';

import Option from '../option';
import SwatchList from '../swatchList';
import TileList from '../tileList';

const mockProps = {
    label: 'label'
};

const mockClasses = {
    title: 'title'
};

test('renders correctly with attribute code "fashion_color" ', () => {
    const wrapper = shallow(<Option
        {...mockProps}
        attribute_code='fashion_color'
        classes={mockClasses}
    />).dive();

    expect(wrapper.find(`.${mockClasses.title}`).text()).toEqual(mockProps.label);
    expect(wrapper.find(SwatchList)).toHaveLength(1);
})

test('renders correctly with attribute code differ from "fashion_color" ', () => {
    const wrapper = shallow(
        <Option
            {...mockProps}
            attribute_code='anyAttribute'
            classes={mockClasses}
        />
    ).dive();

    expect(wrapper.find(`.${mockClasses.title}`).text()).toEqual(mockProps.label);
    expect(wrapper.find(TileList)).toHaveLength(1);
})
