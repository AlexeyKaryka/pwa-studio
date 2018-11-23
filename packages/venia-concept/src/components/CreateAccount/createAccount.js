import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Input from 'src/components/Input';
import { HelpTypes } from 'src/components/Input';
import Button from 'src/components/Button';
import defaultClasses from './createAccount.css';
import classify from 'src/classify';
import { Form } from 'informed';
import { debounce } from 'underscore';
import { RestApi } from '@magento/peregrine';
import ErrorDisplay from 'src/components/ErrorDisplay';
import Checkbox from 'src/components/Checkbox';

const { request } = RestApi.Magento2;

const fields = {
    email: 'email',
    firstName: 'first-name',
    familyName: 'family-name',
    password: 'password',
    confirmPassword: 'confirm-password'
};

class CreateAccount extends Component {
    static propTypes = {
        classes: PropTypes.shape({
            root: PropTypes.string,
            createAccountError: PropTypes.string
        }),
        createAccountError: PropTypes.object,
        createAccount: PropTypes.func
    };

    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirm: '',
        subscribe: false,
        checkingEmail: false,
        emailAvailable: false,
        subscribe: false
    };

    get errorMessage() {
        const { createAccountError } = this.props;
        return <ErrorDisplay error={createAccountError} />;
    }

    get hasEmailError() {
        // Only return true if the email field has a value, and it's not being checked against existing emails
        return (
            !!this.state.email &&
            !this.state.emailAvailable &&
            !this.state.checkingEmail
        );
    }

    get hasPasswordConfirmError() {
        // Check if passwords match
        return this.state.password !== this.state.passwordConfirm;
    }

    get isIncompleteOrInvalid() {
        // A catch-all to check if the form is valid so the customer can attempt to create an account
        return (
            this.hasEmailError ||
            this.hasPasswordConfirmError ||
            !this.state.email ||
            !this.state.firstName ||
            !this.state.lastName
        );
    }

    get emailHelpText() {
        // Displays under the email Input as help text
        return this.hasEmailError
            ? 'This email is already in use'
            : 'Use an active email';
    }

    get emailHelpType() {
        // If the email has an error, use the 'error' help text
        return this.hasEmailError ? HelpTypes.error : HelpTypes.hint;
    }

    get passwordConfirmHelpText() {
        // If passwords do not match, set appropriate text under password Input
        return this.hasPasswordConfirmError ? 'Passwords do not match' : '';
    }

    get passwordConfirmHelpType() {
        return HelpTypes.error;
    }

    render() {
        const { classes, defaultUsername } = this.props;
        const {
            onCreateAccount,
            errorMessage,
            emailHelpText,
            emailHelpType,
            passwordConfirmHelpText,
            passwordConfirmHelpType,
            isIncompleteOrInvalid
        } = this; // Uses `getters` defined above
        const {
            email,
            firstName,
            familyName,
            password,
            confirmPassword
        } = fields;

        return (
            <div className={classes.root}>
                <Form onSubmit={onCreateAccount}>
                    {({ formApi, formState }) => (
                        <Fragment>
                            <div className={classes.rewards}>
                                <span>
                                    An account gives you access to rewards!
                                </span>
                            </div>
                            <Input
                                onChange={this.updateEmail}
                                selected={true} //TODO: investigate whether it's possible to implement storing a value of one currently focused field in informed's Form, so that it would help to set up default focused field
                                label={'Email'}
                                helpText={emailHelpText}
                                helpType={emailHelpType}
                                fieldValue={formState.values[email]}
                                setFieldValue={value =>
                                    formApi.setValue(email, value)
                                }
                                getIsFieldTouched={() =>
                                    formApi.getTouched(email)
                                }
                                required={true}
                                autoComplete={'email'}
                                initialValue={defaultUsername}
                                field={email}
                            />
                            <Input
                                onChange={this.updateFirstName}
                                label={'First Name'}
                                fieldValue={formState.values[firstName]}
                                setFieldValue={value =>
                                    formApi.setValue(firstName, value)
                                }
                                getIsFieldTouched={() =>
                                    formApi.getTouched(firstName)
                                }
                                required={true}
                                autoComplete={'given-name'}
                                field={firstName}
                            />
                            <Input
                                onChange={this.updateLastName}
                                label={'Last Name'}
                                fieldValue={formState.values[familyName]}
                                setFieldValue={value =>
                                    formApi.setValue(familyName, value)
                                }
                                getIsFieldTouched={() =>
                                    formApi.getTouched(familyName)
                                }
                                required={true}
                                autoComplete={'family-name'}
                                field={familyName}
                            />
                            <Input
                                onChange={this.updatePassword}
                                label={'Password'}
                                fieldValue={formState.values[password]}
                                setFieldValue={value =>
                                    formApi.setValue(password, value)
                                }
                                getIsFieldTouched={() =>
                                    formApi.getTouched(password)
                                }
                                type={'password'}
                                required={true}
                                placeholder={'Enter a password'}
                                helpText={
                                    'Password must be at least 8 characters long and contain 3 or more of the following: Lowercase, Uppercase, Digits, or Special Characters. (ex. Password1)'
                                }
                                autoComplete={'new-password'}
                                field={password}
                            />
                            <Input
                                onChange={this.updatePasswordConfirm}
                                label={'Confirm Password'}
                                fieldValue={formState.values[confirmPassword]}
                                setFieldValue={value =>
                                    formApi.setValue(confirmPassword, value)
                                }
                                getIsFieldTouched={() =>
                                    formApi.getTouched(confirmPassword)
                                }
                                type={'password'}
                                required={true}
                                placeholder={'Enter the password again'}
                                helpText={passwordConfirmHelpText}
                                helpType={passwordConfirmHelpType}
                                field={confirmPassword}
                            />
                            <Checkbox
                                label={'Subscribe to news and updates'}
                                select={this.handleCheckboxChange}
                                initialState={this.state.subscribe}
                            />
                            <div className={classes.createAccountButton}>
                                <Button
                                    type="submit"
                                    disabled={isIncompleteOrInvalid}
                                >
                                    Create Account
                                </Button>
                            </div>
                            {errorMessage}
                        </Fragment>
                    )}
                </Form>
            </div>
        );
    }

    onCreateAccount = () => {
        if (!this.isIncompleteOrInvalid) {
            const newCustomer = {
                customer: {
                    firstname: this.state.firstName,
                    lastname: this.state.lastName,
                    email: this.state.email
                },
                password: this.state.password
            };
            this.props.createAccount(newCustomer);
        }
    };

    handleCheckboxChange = value => {
        this.setState({ subscribe: value });
    };

    checkEmail = debounce(async email => {
        try {
            const body = {
                customerEmail: email,
                website_id: null
            };
            // endpoint returns a boolean, so we set our emailAvailable state to the response
            const response = await request(
                '/rest/V1/customers/isEmailAvailable',
                {
                    method: 'POST',
                    body: JSON.stringify(body)
                }
            );
            this.setState({ emailAvailable: response, checkingEmail: false });
        } catch (error) {
            console.warn('err: ', error);
        }
    }, 300);

    updateLastName = newLastName => {
        this.setState({ lastName: newLastName });
    };

    updateFirstName = newFirstName => {
        this.setState({ firstName: newFirstName });
    };

    updateEmail = newEmail => {
        this.setState({ checkingEmail: true, email: newEmail });
        this.checkEmail(newEmail);
    };

    updatePassword = newPassword => {
        this.setState({ password: newPassword });
    };

    updatePasswordConfirm = newPasswordConfirm => {
        this.setState({ passwordConfirm: newPasswordConfirm });
    };
}

export default classify(defaultClasses)(CreateAccount);
