import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import PurchaseHistory, { mockPurchaseHistory } from '../purchaseHistory';
import Filter from '../Filter';
import PurcahseHistoryItem from '../PurchaseHistoryItem';

configure({ adapter: new Adapter() });

const classesPurchaseHistory = {
    itemsContainer: 'itemsContainer',
    body: 'body',
    filterContainer: 'filterContainer',
    list: 'list'
};

const classesPurchaseHistoryItem = {
    body: 'body',
    titleImage: 'titleImage',
    textBlock: 'textBlock',
    textBlockTitle: 'textBlockTitle',
    textBlockDate: 'textBlockDate',
    chevronContainer: 'chevronContainer'
};

const classesFilter = {
    root: 'root',
    filterIconContainer: 'filterIconContainer'
};

test('renders correctly', () => {
    const wrapper = mount(<PurchaseHistory classes={classesPurchaseHistory} items={mockPurchaseHistory}/>);
    expect(wrapper.find(Filter)).toHaveLength(1);
    console.log(wrapper.debug());
    //expect(wrapper.find(`.${classesPurchaseHistory.list}`).shallow().find(`.${classesPurchaseHistory.itemsContainer}`)).toHaveLength(1);
    //expect(wrapper.find(PurcahseHistoryItem)).toHaveLength(mockPurchaseHistory.length);
});
