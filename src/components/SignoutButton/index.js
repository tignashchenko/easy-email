import React from 'react';
import { withRouter } from 'react-router-dom';

import Styles from './styles.scss';

const Button = withRouter(({ history }) => (
    <button
        className = { Styles.signout }
        type = 'submit'
        onClick = { () => {
            history.push('/login');
        } }>Sign out</button>
));

export default Button;
