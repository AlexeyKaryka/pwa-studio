import React, { Component, Fragment } from 'react';
import { Form } from 'informed';
import memoize from 'memoize-one';
import PropTypes from 'prop-types';

import classify from 'src/classify';
import { default as Input, HelpTypes } from 'src/components/Input';
import Button from 'src/components/Button';
import { fields, fieldsLabels } from './constants';
import { validatorStateField } from './helpers';
import defaultClasses from './address.css';

const filterInitialValues = memoize(values =>
    Object.keys(fields).reduce((acc, key) => {
        acc[key] = values[key];
        return acc;
    }, {})
);

class AddressForm extends Component {
    static propTypes = {
        cancel: PropTypes.func,
        classes: PropTypes.shape({
            body: PropTypes.string,
            city: PropTypes.string,
            email: PropTypes.string,
            firstname: PropTypes.string,
            footer: PropTypes.string,
            lastname: PropTypes.string,
            postcode: PropTypes.string,
            region_code: PropTypes.string,
            street0: PropTypes.string,
            telephone: PropTypes.string,
            serverValidation: PropTypes.string,
            textInput: PropTypes.string,
            inputRoot: PropTypes.string
        }),
        submit: PropTypes.func,
        isAddressIncorrect: PropTypes.bool,
        incorrectAddressMessage: PropTypes.string
    };

    getInput = inputProps => {
        const {
            classes: { textInput, inputRoot }
        } = this.props;
        const {
            field,
            validatorNotEmpty = null,
            formApi,
            formState
        } = inputProps;
        const inputClasses = {
            input: textInput,
            root: inputRoot,
            rootFocused: ''
        };

        const setFieldValue = value => formApi.setValue(field, value);
        const getError = () => formApi.getError(field);

        return (
            <Input
                fieldValue={formState.values[field]}
                setFieldValue={setFieldValue}
                helpType={HelpTypes.error}
                getHelpText={getError}
                field={field}
                classes={inputClasses}
                label={fieldsLabels[field]}
                {...validatorNotEmpty && { validatorNotEmpty }}
                validateOnChange={true}
                required={true}
            />
        );
    };

    get serverValidationMessage() {
        const { classes, incorrectAddressMessage } = this.props;
        return (
            <div className={classes.serverValidation}>
                {incorrectAddressMessage}
            </div>
        );
    }

    render() {
        const { children, props } = this;
        const { classes, initialValues } = props;
        const values = filterInitialValues(initialValues);

        return (
            <Form
                className={classes.root}
                initialValues={values}
                onSubmit={this.submit}
            >
                {children}
            </Form>
        );
    }

    children = ({ formApi, formState }) => {
        const { classes, submitting, isAddressIncorrect } = this.props;
        const {
            city,
            email,
            firstname,
            lastname,
            postcode,
            region_code,
            street,
            telephone
        } = fields;

        return (
            <Fragment>
                <div className={classes.body}>
                    <h2 className={classes.heading}>Shipping Address</h2>
                    <div className={classes.firstname}>
                        {this.getInput({
                            field: firstname,
                            formApi,
                            formState
                        })}
                    </div>
                    <div className={classes.lastname}>
                        {this.getInput({
                            field: lastname,
                            formApi,
                            formState
                        })}
                    </div>
                    <div className={classes.street0}>
                        {this.getInput({
                            field: street,
                            formApi,
                            formState
                        })}
                    </div>
                    <div className={classes.city}>
                        {this.getInput({
                            field: city,
                            formApi,
                            formState
                        })}
                    </div>
                    <div className={classes.postcode}>
                        {this.getInput({
                            field: postcode,
                            formApi,
                            formState
                        })}
                    </div>
                    <div className={classes.region_code}>
                        {this.getInput({
                            field: region_code,
                            validatorNotEmpty: validatorStateField,
                            formApi,
                            formState
                        })}
                    </div>
                    <div className={classes.telephone}>
                        {this.getInput({
                            field: telephone,
                            formApi,
                            formState
                        })}
                    </div>
                    <div className={classes.email}>
                        {this.getInput({
                            field: email,
                            formApi,
                            formState
                        })}
                    </div>
                    {isAddressIncorrect ? this.serverValidationMessage : null}
                </div>
                <div className={classes.footer}>
                    <Button type="submit" disabled={submitting}>
                        Save
                    </Button>
                    <Button onClick={this.cancel}>Cancel</Button>
                </div>
            </Fragment>
        );
    };

    cancel = () => {
        this.props.cancel();
    };

    submit = values => {
        this.props.submit(values);
    };
}

export default classify(defaultClasses)(AddressForm);

/*
const mockAddress = {
    country_id: 'US',
    firstname: 'Veronica',
    lastname: 'Costello',
    street: ['6146 Honey Bluff Parkway'],
    city: 'Calder',
    postcode: '49628-7978',
    region_id: 33,
    region_code: 'MI',
    region: 'Michigan',
    telephone: '(555) 229-3326',
    email: 'veronica@example.com'
};
*/
