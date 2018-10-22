import React, { Component } from 'react';
import { number, shape, string } from 'prop-types';
import { Link } from 'react-router-dom';

import Icon from 'src/components/Icon';
import classify from 'src/classify';
import defaultClasses from './purchaseHistoryItem.css';

class PurchaseHistoryItem extends Component {
    static propTypes = {
        classes: shape({
            body: string
        }),
        item: shape({
            id: number,
            imageSrc: string,
            title: string,
            date: string,
            link: string
        })
    };

    render() {
        const {
            classes,
            item: { imageSrc, title, date, link }
        } = this.props;

        const trimedTitle =
            title.length >= 19 ? `${title.substring(0, 19)}...` : title;

        return (
            <Link className={classes.body} to={link}>
                <img
                    src={imageSrc}
                    className={classes.titleImage}
                    alt="clothes"
                />
                <div className={classes.textBlock}>
                    <div className={classes.textBlockTitle}>{trimedTitle}</div>
                    <div className={classes.textBlockDate}>{date}</div>
                </div>
                <div className={classes.chevronContainer}>
                    <Icon name="chevron-right" />
                </div>
            </Link>
        );
    }
}

export default classify(defaultClasses)(PurchaseHistoryItem);
