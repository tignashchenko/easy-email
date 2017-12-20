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
                            path = '/sentmail'
                            render = { (routeProps) => (
                                <SentMail
                                    { ...routeProps }
                                />
                            ) }
                        />
                    }
                    {
                        <Route
                            exact
                            path = '/important'
                            render = { (routeProps) => (
                                <Important
                                    { ...routeProps }
                                />
                            ) }
                        />
                    }
                    {
                        <Route
                            exact
                            path = '/drafts'
                            render = { (routeProps) => (
                                <Drafts
                                    { ...routeProps }
                                />
                            ) }
                        />
                    }
                    {
                        <Route
                            exact
                            path = '/trash'
                            render = { (routeProps) => (
                                <Trash
                                    { ...routeProps }
                                />
                            ) }
                        />
                    }
                    {
                        <Route
                            exact
                            path = '/spam'
                            render = { (routeProps) => (
                                <Spam
                                    { ...routeProps }
                                />
                            ) }
                        />
                    }
                    {
                        <Route
                            exact
                            path = '/allmail'
                            render = { (routeProps) => (
                                <AllMail
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
                </Switch>
            </BrowserRouter>
        );
    }
}
