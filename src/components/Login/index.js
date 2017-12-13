import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Styles from './styles.scss';

export default class Login extends Component {
    render () {
        return (
            <div className = { Styles.login }>
                <h1>Sign in now</h1>
                <form className = 'user-id'>
                    <div>
                        <input placeholder = 'User Id' type = 'text' />
                    </div>
                    <div className = 'password'>
                        <input placeholder = 'Password' type = 'text' />
                    </div>
                    <div className = 'remember-sign-in-options'>
                        <input id = 'rememberMe' type = 'checkbox' />
                        <label htmlFor = 'rememberMe'>Remember Me</label>
                        <button type = 'submit'>Sign in</button>
                    </div>
                </form>
                <div className = 'forgot-credentials'>
                    <p>Forgot Password?</p>
                    <p>Forgot User Id?</p>
                </div>
                <div className = 'sign-up'>
                    <p>
                        Don't have an account yet?
                        <Link to = '/signup'>Create an account</Link>
                    </p>
                </div>
            </div>
        );
    }
}
