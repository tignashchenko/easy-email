import React from 'react';
import { bool, func, object } from 'prop-types';
import Styles from './styles.scss';

const SignoutButton = ({ history, handleLogin, handleRemember, remember }) => (
    <button
        className = { Styles.signout }
        type = 'submit'
        onClick = { () => {
            if (remember) {
                handleRemember();
                localStorage.removeItem('remember');
            }
            handleLogin();
            history.push('/login');
            localStorage.removeItem('loggedIn');
        } }>Sign out</button>
);

SignoutButton.propTypes = {
    handleLogin:    func.isRequired,
    handleRemember: func.isRequired,
    history:        object.isRequired,
    remember:       bool.isRequired,
};

export default SignoutButton;
