import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { func, object, string } from 'prop-types';

import Styles from './styles.scss';

export default class Login extends Component {
    static propTypes = {
        handleLogin: func.isRequired,
        history:     object.isRequired,
        password:    string.isRequired,
        userId:      string.isRequired,
    };

    constructor (props) {
        super(props);

        this.checkCredentials = this._checkCredentials.bind(this);
        this.handlePasswordInput = this._handlePasswordInput.bind(this);
        this.handleUserIdInput = this._handleUserIdInput.bind(this);
    }

    state = {
        attemptedUserId:   '',
        attemptedPassword: '',
    };

    _checkCredentials (event) {
        const { handleLogin, password, userId } = this.props;
        const { attemptedPassword, attemptedUserId } = this.state;

        event.preventDefault();

        if (password === attemptedPassword && userId === attemptedUserId) {
            handleLogin();
            this.props.history.push('/inbox');
        }
    }

    _handlePasswordInput (event) {
        this.setState({
            attemptedPassword: event.target.value,
        });
    }

    _handleUserIdInput (event) {
        this.setState({
            attemptedUserId: event.target.value,
        });
    }

    render () {
        return (
            <div className = { Styles.login }>
                <h1>Sign in now</h1>
                <form>
                    <div>
                        <input
                            id = 'userId'
                            placeholder = 'User Id'
                            size = '50'
                            type = 'text'
                            onChange = { this.handleUserIdInput }
                        />
                    </div>
                    <div>
                        <input
                            id = 'password'
                            placeholder = 'Password'
                            size = '50'
                            type = 'text'
                            onChange = { this.handlePasswordInput }
                        />
                    </div>
                    <div className = { Styles.signInOptions }>
                        <div>
                            <input id = 'rememberMe' type = 'checkbox' />
                            <label htmlFor = 'rememberMe'>Remember Me</label>
                        </div>
                        <button type = 'submit' onClick = { this.checkCredentials }>
                            Sign in
                        </button>
                    </div>
                </form>
                <div className = { Styles.forgotCredentials }>
                    <Link to = '/error'>Forgot Password?</Link>
                    <Link to = '/error'>Forgot User Id?</Link>
                </div>
                <div className = 'sign-up'>
                    <p>
                        <span>Don't have an account yet? </span>
                        <Link to = '/signup'>Create an account</Link>
                    </p>
                </div>
            </div>
        );
    }
}
