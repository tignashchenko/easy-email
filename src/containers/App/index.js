import React, { Component } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Styles from './styles.scss';

import Inbox from '../../components/Inbox';
import Login from '../../components/Login';

const FourOfour = () => <h1>404</h1>;

export default class App extends Component {
    state = {
        loggedIn: false,
    };

    render () {
        const { loggedIn } = this.state;


        return (
            <BrowserRouter>
                <div className = { Styles.app }>
                    <Switch>
                        <Route
                            exact
                            path = '/'
                            render = { () =>
                                loggedIn ? (
                                    <Redirect to = '/inbox' />
                                ) : (
                                    <Redirect to = '/login' />
                                )
                            }
                        />
                        <Route exact path = '/inbox' component = { Inbox } />
                        <Route exact path = '/login' component = { Login } />
                        <Route component = { FourOfour } />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}
