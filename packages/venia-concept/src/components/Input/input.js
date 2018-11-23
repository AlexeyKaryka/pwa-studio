import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Text } from 'informed';
import defaultClasses from './input.css';
import classify from 'src/classify';
import Icon from 'src/components/Icon';
import { resetButtonIcon, HelpTypes } from './constants';
import { validatorNotEmpty, dumpValidator } from './helpers';

class Input extends Component {
    static propTypes = {
        classes: PropTypes.shape({
            helpText: PropTypes.string,
            label: PropTypes.string,
            labelFocused: PropTypes.string,
            root: PropTypes.string,
            input: PropTypes.string,
            inputContainer: PropTypes.string,
            rootFocused: PropTypes.string,
            resetInput: PropTypes.string
        }),
        initialValue: PropTypes.string,
        placeholder: PropTypes.string,
        label: PropTypes.string.isRequired,
        type: PropTypes.string,
        disabled: PropTypes.bool,
        required: PropTypes.bool,
        title: PropTypes.string,
        autoComplete: PropTypes.string,
        helpType: PropTypes.string,
        helpText: PropTypes.string,
        getHelpText: PropTypes.func,
        fieldValue: PropTypes.string,
        setFieldValue: PropTypes.func,
        field: PropTypes.string.isRequired,
        onChange: PropTypes.func,
        validator: PropTypes.func,
        validatorNotEmpty: PropTypes.func,
        validateOnChange: PropTypes.bool
    };

    static defaultProps = {
        initialValue: '',
        disabled: false,
        helpType: HelpTypes.hint,
        helpText: '',
        validator: dumpValidator,
        validatorNotEmpty,
        validateOnChange: false
    };

    state = {
        focused: false
    };

    complexValidator = (value, values = null) => {
        const { validator, validatorNotEmpty, required } = this.props;

        return required
            ? validatorNotEmpty(value) || validator(value, values)
            : validator(value, values);
    };

    get helpText() {
        const { classes, helpText, getHelpText, helpType } = this.props;
        let helpTypeClass = `${classes.helpText} ${classes[helpType]}`;

        return helpText || getHelpText ? (
            <div className={helpTypeClass}>
                {helpText ? helpText : getHelpText()}
            </div>
        ) : null;
    }

    get labelText() {
        const { classes, label } = this.props;
        let className = `${classes.label}`;
        if (this.state.focused) {
            className += ` ${classes.labelFocused}`;
        }
        return <span className={className}>{label}</span>;
    }

    get rootClass() {
        const { classes } = this.props;
        let className = `${classes.root}`;
        if (this.state.focused) {
            className += ` ${classes.rootFocused}`;
        }
        return className;
    }

    get requiredSymbol() {
        const { classes, required } = this.props;
        return required ? <div className={classes.requiredSymbol} /> : null;
    }

    get resetButton() {
        const { classes } = this.props;
        const { name, attrs } = resetButtonIcon;
        return (
            <button
                type="button"
                className={classes.resetInput}
                onClick={this.resetValue}
            >
                <Icon name={name} attrs={attrs} />
            </button>
        );
    }

    resetValue = () => {
        this.props.setFieldValue(null);
    };

    render() {
        const {
            helpText,
            labelText,
            requiredSymbol,
            rootClass,
            complexValidator,
            resetButton
        } = this;
        const {
            classes,
            placeholder,
            type,
            disabled,
            title,
            initialValue,
            validateOnChange,
            fieldValue
        } = this.props;
        let { autoComplete, field } = this.props;

        autoComplete = !autoComplete ? 'off' : autoComplete;

        return (
            <div className={rootClass}>
                <span className={classes.label}>
                    {requiredSymbol} {labelText}
                </span>
                <div className={classes.inputContainer}>
                    <Text
                        initialValue={initialValue}
                        className={classes.input}
                        placeholder={placeholder}
                        type={type}
                        disabled={disabled}
                        title={title}
                        autoComplete={autoComplete}
                        onChange={this.handleChange}
                        onFocus={this.focusTextInput}
                        onBlur={this.blurTextInput}
                        field={field}
                        validate={complexValidator}
                        validateOnChange={validateOnChange}
                    />
                    {fieldValue ? resetButton : null}
                </div>
                {helpText}
            </div>
        );
    }

    handleChange = () => {
        const { onChange, fieldValue } = this.props;
        onChange && onChange(fieldValue);
    };

    focusTextInput = () => {
        this.setState({ focused: true });
    };

    blurTextInput = () => {
        this.setState({ focused: false });
    };
}

export default classify(defaultClasses)(Input);
