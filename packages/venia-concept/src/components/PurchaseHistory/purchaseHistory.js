import React, { Component } from 'react';
import { shape, string } from 'prop-types';
import { List } from '@magento/peregrine';

import PurchaseHistoryItem from './PurchaseHistoryItem';
import classify from 'src/classify';
import defaultClasses from './purchaseHistory.css';
import Filter from './Filter';

const mockPurchaseHistory = [
    {
        id: 1,
        imageSrc: 'asd',
        title: 'Lorem ipsum dolor sit amet',
        date: '12,12,2018',
        link: '/prettyDress'
    },
    {
        id: 2,
        imageSrc: 'asd',
        title: 'consectetur adipiscing elit',
        date: '12,12,2018',
        link: '/prettyDress'
    },
    {
        id: 3,
        imageSrc: 'asd',
        title: 'sasdasdasdasdas',
        date: '12,12,2018',
        link: '/prettyDress'
    },
    {
        id: 4,
        imageSrc: 'asd',
        title: 'dasdasdasdasda',
        date: '12,12,2018',
        link: '/prettyDress'
    }
];

class PurchaseHistory extends Component {
    static propTypes = {
        classes: shape({
            body: string
        })
    };

    // componentDidMount() {
    //     this.props.fetchPurchaseHistory();
    // }

    // componentWillUnmount() {
    //     this.props.resetPurchaseHistory();
    // }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.body}>
                <div className={classes.filterContainer}>
                    <Filter />
                </div>
                <List
                    //classes={}
                    items={mockPurchaseHistory}
                    getItemKey={({ id }) => id}
                    render={props => (
                        <div className={classes.itemsContainer}>
                            {props.children}
                        </div>
                    )}
                    renderItem={PurchaseHistoryItem}
                />
            </div>
        );
    }
}

export default classify(defaultClasses)(PurchaseHistory);
