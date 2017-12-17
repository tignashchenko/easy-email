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
                            component = { Inbox } // eslint-disable-line react/jsx-sort-props
                            exact
                            path = '/inbox'
                        />
                        <Route
                            component = { Login } // eslint-disable-line react/jsx-sort-props
                            exact
                            path = '/login'
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
                        <Route component = { Error } />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}
