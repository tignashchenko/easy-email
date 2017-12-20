import React from 'react';
import { func, object } from 'prop-types';
import Styles from './styles.scss';

const SignoutButton = ({ history, handleLogin }) => (
    <button
        className = { Styles.signout }
        type = 'submit'
        onClick = { () => {
            handleLogin();
            history.push('/login');
        } }>Sign out</button>
);

SignoutButton.propTypes = {
    handleLogin: func.isRequired,
    history:     object.isRequired,
};

export default SignoutButton;
