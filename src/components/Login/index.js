import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Styles from './styles.scss';

export default class Login extends Component {
    render () {
        return (
            <div className = { Styles.login }>
                <h1>Sign in now</h1>
                <form>
                    <div>
                        <input placeholder = 'User Id' size = '50' type = 'text' />
                    </div>
                    <div>
                        <input placeholder = 'Password' size = '50' type = 'text' />
                    </div>
                    <div className = { Styles.signInOptions }>
                        <div>
                            <input id = 'rememberMe' type = 'checkbox' />
                            <label htmlFor = 'rememberMe'>Remember Me</label>
                        </div>
                        <button type = 'submit'>Sign in</button>
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
