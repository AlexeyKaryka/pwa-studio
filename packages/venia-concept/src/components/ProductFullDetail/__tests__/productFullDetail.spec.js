import React from 'react';
import { shallow } from 'enzyme';
import { Price } from '@magento/peregrine';

import Carousel from 'src/components/ProductImageCarousel';
import Quantity from 'src/components/ProductQuantity';
import Button from 'src/components/Button';
import ProductFullDetail from '../ProductFullDetail';

const mockProps = {
    product: {
        name: 'name',
        sku: 'sku'
    }
};

const mockClasses = {
    title: 'title',
    details: 'details'
};

test('renders correctly', () => {
    const wrapper = shallow(<ProductFullDetail {...mockProps} />).dive();

    expect(wrapper.find(`.${mockClasses.title}`).text()).toEqual(mockProps.product.name);
    expect(wrapper.find(Price)).toHaveLength(1);
    expect(wrapper.find(Carousel)).toHaveLength(1);
    expect(wrapper.find(Quantity)).toHaveLength(1);
    expect(wrapper.find(Button)).toHaveLength(1);
    expect(wrapper.find(`.${mockClasses.details}`).text()).toEqual(mockProps.product.sku);
});
