import React from 'react';
import { array, func } from 'prop-types';
import Styles from './styles.scss';

const Button = ({ history, handleLogin }) => (
    <button
        className = { Styles.signout }
        type = 'submit'
        onClick = { () => {
            handleLogin();
            history.push('/login');
        } }>Sign out</button>
);

Button.propTypes = {
    handleLogin: func.isRequired,
    history:     array.isRequired,
};

export default Button;
