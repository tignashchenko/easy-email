import React, { Component } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Error from '../../components/Error';
import Inbox from '../../components/Inbox';
import Login from '../../components/Login';
import Signup from '../../components/Signup';

export default class App extends Component {
    state = {
        loggedIn: false,
    };

    render () {
        const { loggedIn } = this.state;

        return (
            <BrowserRouter>
                <div>
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
                        <Route
                            component = { Signup } // eslint-disable-line react/jsx-sort-props
                            exact
                            path = '/signup'
                        />
                        <Route
                            component = { Inbox } // eslint-disable-line react/jsx-sort-props
                            exact
                            path = '/inbox'
                        />
                        <Route
                            component = { Login } // eslint-disable-line react/jsx-sort-props
                            exact
                            path = '/login'
                        />
                        <Route component = { Error } />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}
