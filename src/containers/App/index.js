import React, { Component } from 'react';

import Styles from './styles.scss';

import Login from '../../components/Login';

export default class App extends Component {
    render () {
        return (
            <div className = { Styles.app }>
                <Login />
            </div>
        );
    }
}
