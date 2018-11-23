import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Input from 'src/components/Input';
import Button from 'src/components/Button';
import defaultClasses from './signIn.css';
import classify from 'src/classify';
import { Form } from 'informed';
import ErrorDisplay from 'src/components/ErrorDisplay';

const fields = {
    username: 'username',
    password: 'password'
};

class SignIn extends Component {
    static propTypes = {
        classes: PropTypes.shape({
            signInSection: PropTypes.string,
            signInDivider: PropTypes.string,
            forgotPassword: PropTypes.string,
            root: PropTypes.string,
            signInError: PropTypes.string,
            showCreateAccountButton: PropTypes.string
        }),

        signInError: PropTypes.object,
        signIn: PropTypes.func
    };

    state = {
        password: '',
        username: ''
    };

    get errorMessage() {
        const { signInError } = this.props;
        return <ErrorDisplay error={signInError} />;
    }

    render() {
        const { classes } = this.props;
        const { onSignIn, errorMessage } = this;
        const { username, password } = fields;

        return (
            <div className={classes.root}>
                <Form onSubmit={onSignIn}>
                    {({ formApi, formState }) => (
                        <Fragment>
                            <Input
                                onChange={this.updateUsername}
                                helpText={'example help text'}
                                fieldValue={formState.values[username]}
                                setFieldValue={value =>
                                    formApi.setValue(username, value)
                                }
                                label={'Username or Email'}
                                required={true}
                                autoComplete={'username'}
                                field={username}
                            />
                            <Input
                                onChange={this.updatePassword}
                                label={'Password'}
                                type={'password'}
                                helpText={'example help text'}
                                fieldValue={formState.values[password]}
                                setFieldValue={value =>
                                    formApi.setValue(password, value)
                                }
                                required={true}
                                autoComplete={'current-password'}
                                field={password}
                            />
                            <div className={classes.signInButton}>
                                <Button type="submit">Sign In</Button>
                            </div>
                            <div className={classes.signInError}>
                                {errorMessage}
                            </div>
                            <div className={classes.forgotPassword}>
                                <a href="/">
                                    {' '}
                                    Forgot your username or password?{' '}
                                </a>
                            </div>
                        </Fragment>
                    )}
                </Form>
                <div className={classes.signInDivider} />
                <div className={classes.showCreateAccountButton}>
                    <Button onClick={this.showCreateAccountForm}>
                        {' '}
                        Create an Account{' '}
                    </Button>
                </div>
            </div>
        );
    }

    onSignIn = () => {
        const { username, password } = this.state;
        this.props.signIn({ username: username, password: password });
    };

    showCreateAccountForm = () => {
        this.props.setDefaultUsername(this.state.username);
        this.props.showCreateAccountForm();
    };

    updatePassword = newPassword => {
        this.setState({ password: newPassword });
    };

    updateUsername = newUsername => {
        this.setState({ username: newUsername });
    };
}

export default classify(defaultClasses)(SignIn);
