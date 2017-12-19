import React, { Component } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import AllMail from '../../components/AllMail';
import Drafts from '../../components/Drafts';
import Error from '../../components/Error';
import Important from '../../components/Important';
import Inbox from '../../components/Inbox';
import Login from '../../components/Login';
import SentMail from '../../components/SentMail';
import Signup from '../../components/Signup';
import Spam from '../../components/Spam';
import Trash from '../../components/Trash';

export default class App extends Component {
    constructor () {
        super();

        this.handleLogin = this._handleLogin.bind(this);
    }

    state = {
        loggedIn: false,
        password: 'asdf1234',
        userId:   'tignashchenko',
    };

    _handleLogin () {
        this.setState((prevState) => ({
            loggedIn: !prevState.loggedIn,
        }));
    }

    render () {
        const { loggedIn, password, userId } = this.state;

        return (
            <BrowserRouter>
                <Switch>
                    { loggedIn
                        ? <Route
                            exact
                            path = '/inbox'
                            render = { (routeProps) => (
                                <Inbox
                                    { ...routeProps }
                                    handleLogin = { this.handleLogin }
                                />
                            )
                            }
                        />
                        : <Route
                            exact
                            path = '/login'
                            render = { (routeProps) => (
                                <Login
                                    { ...routeProps }
                                    handleLogin = { this.handleLogin }
                                    password = { password }
                                    userId = { userId }
                                />
                            ) }
                        />
                    }
                    {
                        <Route
                            exact
                            path = '/signup'
                            render = { (routeProps) => (
                                <Signup
                                    { ...routeProps } 
                                />
                            ) }
                        />
                    }
                    {
                        <Route
                            exact
                            path = '/'
                            render = { (routeProps) => (
                                <Redirect
                                    to = '/login'
                                    { ...routeProps }
                                />
                            ) }
                        />
                    }
                    {
                        <Route component = { Error } />
                    }
                    {/*<Redirect to = '/login' />*/}
                        {/*<Route
                            component = { Signup } // eslint-disable-line react/jsx-sort-props
                            exact
                            path = '/signup'
                        />
                        <Route
                            component = { AllMail } // eslint-disable-line react/jsx-sort-props
                            exact
                            path = '/allmail'
                        />
                        <Route
                            component = { Drafts } // eslint-disable-line react/jsx-sort-props
                            exact
                            path = '/drafts'
                        />
                        <Route
                            component = { Important } // eslint-disable-line react/jsx-sort-props
                            exact
                            path = '/important'
                        />
                        <Route
                            exact
                            path = '/inbox'
                            render = { (routeProps) => (
                                <Inbox
                                    { ...routeProps }
                                    handleLogin = { this.handleLogin }
                                />
                            )
                            }
                        />
                        <Route
                            exact
                            path = '/login'
                            render = { (routeProps) =>
                                loggedIn ? (
                                    <Redirect to = '/inbox' />
                                ) : (
                                    <Login
                                        { ...routeProps }
                                        handleLogin = { this.handleLogin }
                                        password = { password }
                                        userId = { userId }
                                    />
                                )
                            }
                        />
                        <Route
                            component = { SentMail } // eslint-disable-line react/jsx-sort-props
                            exact
                            path = '/sentmail'
                        />
                        <Route
                            component = { Spam } // eslint-disable-line react/jsx-sort-props
                            exact
                            path = '/spam'
                        />
                        <Route
                            component = { Trash } // eslint-disable-line react/jsx-sort-props
                            exact
                            path = '/trash'
                        />
                        <Route component = { Error } />*/}
                </Switch>
            </BrowserRouter>
        );
    }
}
