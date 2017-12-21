import React, { Component } from 'react';
import _ from 'lodash';
import { func, object } from 'prop-types';

import EmailList from '../EmailList';
import faker from 'faker';
import MdSearch from 'react-icons/lib/md/search';
import moment from 'moment';
import Navigation from '../Navigation';
import SignoutButton from '../SignoutButton';
import { v4 } from 'uuid';

import Styles from './styles.scss';

export default class Inbox extends Component {
    static propTypes = {
        handleLogin: func.isRequired,
        history:     object.isRequired,
    }

    constructor () {
        super();

        this.checkForUnread = this._checkForUnread.bind(this);
        this.checkForSelections = this._checkForSelections.bind(this);
        this.createRandomDate = this._createRandomDate.bind(this);
        this.getEmails = this._getEmails.bind(this);
        this.handleEmailSearch = this._handleEmailSearch.bind(this);
        this.handlSearchTermChange = this._handleSearchTermChange.bind(this);
        this.handleSelections = this._handleSelections.bind(this);
        this.sortEmailsByDate = this._sortEmailsByDate.bind(this);
        this.searchEmails = this._searchEmails.bind(this);
        this.sendToImportant = this._sendToImportant.bind(this);
        this.sendToSpam = this._sendToSpam.bind(this);
        this.sendToTrash = this._sendToTrash.bind(this);
        this.toggleImportant = this._toggleImportant.bind(this);
        this.toggleRead = this._toggleRead.bind(this);
        this.toggleReadAll = this._toggleReadAll.bind(this);
        this.toggleSelect = this._toggleSelect.bind(this);
        this.toggleSelectAll = this._toggleSelectAll.bind(this);
    }
    state = {
        anySelected: false,
        emails:      [],
        important:   [],
        searchTerm:  '',
        spam:        [],
        trash:       [],
        unRead:      0,
    };

    componentWillMount () {
        localStorage.setItem('loggedIn', true);
        this.getEmails();
        this.setState((prevState) => ({
            emails: this.sortEmailsByDate(prevState.emails).reverse(),
        }));
    }

    componentDidMount () {
        const { emails } = this.state;

        this.checkForUnreadEmails = setInterval(this.checkForUnread, 250);
        this.checkSelections = setInterval(this.checkForSelections, 250);
        this.checkImportant = setInterval(this.sendToImportant, 250);

        if (!localStorage.getItem('myEmails')) {
            localStorage.setItem('myEmails', JSON.stringify(emails));
        }
    }

    componentWillUnmount () {
        clearInterval(this.checkForUnreadEmails);
        clearInterval(this.checkSelections);
        clearInterval(this.checkImportant);
    }

    _checkForUnread () {
        const { emails } = this.state;
        let unReadEmails = 0;

        for (let i = 0; i < emails.length; i++) {
            if (emails[i].isUnread) {
                unReadEmails += 1;
            }
        }

        this.setState({ unRead: unReadEmails });
    }

    _checkForSelections () {
        const { emails } = this.state;
        let shouldUpdate = false;

        for (let i = 0; i < emails.length; i++) {
            if (emails[i].isSelected) {
                shouldUpdate = true;
            }
        }

        this.setState({
            anySelected: shouldUpdate,
        });
    }

    _createRandomDate (end = moment(), start) {
        const endMoment = moment(end);
        const randomNumber = (to, from = 0) =>
            Math.floor(Math.random() * (to - from) + from);

        if (start) {
            const startMoment = moment(start);

            if (startMoment.unix() > endMoment.unix()) {
                throw new Error('End date is before start date!');
            }

            return moment
                .unix(randomNumber(endMoment.unix(), startMoment.unix()))
                .format('YYYY-MM-DD HH:mm:ss');
        }

        return moment
            .unix(randomNumber(endMoment.unix()))
            .format('YYYY-MM-DD HH:mm:ss');
    }

    _getEmails () {
        if (!localStorage.getItem('myEmails')) {
            this.setState((prevState) => {
                for (let i = 0; i < 5; i++) {
                    const content = faker.fake('{{lorem.paragraph}}');
                    const date = this.createRandomDate('2017-12-15', '2017-06-01');
                    const id = v4();
                    const sender = faker.fake(
                        '{{name.firstName}} {{name.lastName}}'
                    );
                    const subject = faker.fake('{{lorem.words}}').toString();

                    prevState.emails.push({
                        content,
                        date,
                        id,
                        isImportant: false,
                        isSelected:  false,
                        isUnread:    true,
                        sender,
                        subject:     `${subject.charAt(0).toUpperCase()}${subject.slice(
                            1
                        )}`,
                    });
                }
            });
        } else {
            this.setState({
                emails: JSON.parse(localStorage.getItem('myEmails')),
            });
        }
    }

    _handleEmailSearch (event) {
        const { searchTerm } = this.state;

        event.preventDefault();

        this.searchEmails(searchTerm);
    }

    _handleSelections (event) {
        this.toggleSelect(event);
    }

    _handleSearchTermChange (event) {
        this.setState({ searchTerm: event.target.value });
    }

    _searchEmails () {
        const { emails, searchTerm } = this.state;

        this.setState(() => ({
            emails: emails.filter(
                (email) =>
                    `${email.content} ${email.sender} ${email.subject}`
                        .toLowerCase()
                        .indexOf(searchTerm.toLowerCase()) >= 0
            ),
        }));
    }

    _sendToImportant () {
        const { emails } = this.state;
        const importantEmails = [];

        for (let i = 0; i < emails.length; i++) {
            if (emails[i].isImportant) {
                importantEmails.push(emails[i]);
            }
        }

        this.setState({
            important: [...importantEmails],
        });
    }

    _sendToSpam () {
        const { emails } = this.state;
        const spamEmails = [];
        const remainingEmails = [];

        for (let i = 0; i < emails.length; i++) {
            if (emails[i].isSelected) {
                spamEmails.push(emails[i]);
            } else {
                remainingEmails.push(emails[i]);
            }
        }

        this.setState({
            emails: [...remainingEmails],
            spam:   [...spamEmails],
        });
    }

    _sendToTrash () {
        const { emails } = this.state;
        const trashedEmails = [];
        const remainingEmails = [];

        for (let i = 0; i < emails.length; i++) {
            if (emails[i].isSelected) {
                trashedEmails.push(emails[i]);
            } else {
                remainingEmails.push(emails[i]);
            }
        }

        this.setState({
            emails: [...remainingEmails],
            trash:  [...trashedEmails],
        });
    }

    _sortEmailsByDate (emails) {
        return _.sortBy(emails, (email) => moment(email.date));
    }

    _toggleImportant (event) {
        const id = event.target.id;
        const { emails } = this.state;

        this.setState(() => ({
            emails: emails.map(
                (email) =>
                    email.id === id
                        ? Object.assign(email, {
                            isImportant: !email.isImportant,
                        })
                        : email
            ),
        }));
    }

    _toggleRead (event) {
        const id = event.target.id;
        const { emails } = this.state;

        this.setState(() => ({
            emails: emails.map(
                (email) =>
                    email.id === id
                        ? Object.assign(email, { isUnread: !email.isUnread })
                        : email
            ),
        }));
    }

    _toggleReadAll () {
        const { emails } = this.state;

        this.setState(() => ({
            emails: emails.map((email) =>
                Object.assign(email, { isUnread: false })
            ),
        }));
    }

    _toggleSelect (event) {
        const id = event.target.id;
        const { emails } = this.state;

        this.setState(() => ({
            emails: emails.map(
                (email) =>
                    email.id === id
                        ? Object.assign(email, {
                            isSelected: !email.isSelected,
                        })
                        : email
            ),
        }));
    }

    _toggleSelectAll () {
        const { emails } = this.state;

        this.setState(() => ({
            emails: emails.map((email) =>
                Object.assign(email, { isSelected: !email.isSelected })
            ),
        }));
    }

    render () {
        const {
            anySelected,
            emails,
            important,
            spam,
            trash,
            unRead,
        } = this.state;

        const { handleLogin } = this.props;

        return (
            <div className = { Styles.inboxNav }>
                <div className = { Styles.nav }>
                    <Navigation
                        emails = { emails }
                        importantEmails = { important }
                        spamEmails = { spam }
                        trashedEmails = { trash }
                        unreadEmails = { unRead }
                    />
                </div>
                <div className = { Styles.inbox }>
                    <div className = { Styles.header }>
                        <h1>Inbox {unRead}</h1>
                        <div>
                            <div>
                                <SignoutButton
                                    handleLogin = { handleLogin }
                                    history = { this.props.history }
                                />
                            </div>
                            <form>
                                <input
                                    placeholder = 'Search'
                                    type = 'text'
                                    onChange = { this.handlSearchTermChange }
                                />
                                <button
                                    type = 'submit'
                                    onClick = { this.handleEmailSearch }>
                                    <MdSearch />
                                </button>
                            </form>
                        </div>
                    </div>
                    <div>
                        <div className = { Styles.select }>
                            <input
                                id = 'selectAll'
                                type = 'checkbox'
                                onChange = { this.toggleSelectAll }
                            />
                            <label htmlFor = 'selectAll'>Select all</label>
                            <input
                                id = 'markAllAsRead'
                                type = 'checkbox'
                                onChange = { this.toggleReadAll }
                            />
                            <label htmlFor = 'markAllAsRead'>
                                Mark all as read
                            </label>
                            {anySelected ? (
                                <button
                                    type = 'submit'
                                    onClick = { this.sendToTrash }>
                                    Move to trash
                                </button>
                            ) : null}
                            {anySelected ? (
                                <button type = 'submit' onClick = { this.sendToSpam }>
                                    Move to spam
                                </button>
                            ) : null}
                        </div>
                    </div>
                    <div>
                        <EmailList
                            emails = { [...emails] }
                            handleSelections = { this.handleSelections }
                            toggleImportant = { this.toggleImportant }
                            toggleRead = { this.toggleRead }
                        />
                    </div>
                </div>
            </div>
        );
    }
}
