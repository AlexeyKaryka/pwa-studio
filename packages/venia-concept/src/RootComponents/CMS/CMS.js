import React, { Component } from 'react';
import Page from 'src/components/Page';
import CategoryList from 'src/components/CategoryList';
import PurchaseHistory, {mockPurchaseHistory} from '../../components/PurchaseHistory/purchaseHistory';

export default class CMS extends Component {
    render() {
        return (
            <PurchaseHistory items={mockPurchaseHistory}/>
        );
    }
}
