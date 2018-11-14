import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classify from 'src/classify';
import { imageItemPropType } from './constants';
import defaultClasses from './thumbnail.css';
import { makeProductMediaPath } from 'src/util/makeMediaPath';
import { transparentPlaceholder } from 'src/shared/images';

class Thumbnail extends Component {
    static propTypes = {
        classes: PropTypes.shape({
            root: PropTypes.string
        }),
        item: imageItemPropType,
        activeItemSrc: PropTypes.string,
        onClickHandler: PropTypes.func
    };

    render() {
        const { classes, item: { file, label }, onClickHandler, activeItemSrc } = this.props;
        const src = file
            ? makeProductMediaPath(file)
            : transparentPlaceholder;
        console.log(file);
        console.log(activeItemSrc);
        return (
            <button onClick={onClickHandler} className={activeItemSrc!==file ? classes.root : classes.rootSelected}>
                <img className={classes.image} src={src} alt={label} />
            </button>
        );
    }
}

export default classify(defaultClasses)(Thumbnail);
