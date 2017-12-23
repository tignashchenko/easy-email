import React, { Component } from 'react';
import _ from 'lodash';
import { bool, func, object } from 'prop-types';

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
        handleLogin:    func.isRequired,
        handleRemember: func.isRequired,
        history:        object.isRequired,
        remember:       bool.isRequired,
    }

    constructor () {
        super();

        this.checkRead = this._checkRead.bind(this);
        this.createRandomDate = this._createRandomDate.bind(this);
        this.getEmails = this._getEmails.bind(this);
        this.handleEmailSearch = this._handleEmailSearch.bind(this);
        this.handlSearchTermChange = this._handleSearchTermChange.bind(this);
        this.handleSelections = this._handleSelections.bind(this);
        this.sortEmailsByDate = this._sortEmailsByDate.bind(this);
        this.searchEmails = this._searchEmails.bind(this);
        this.sendToSpam = this._sendToSpam.bind(this);
        this.sendToTrash = this._sendToTrash.bind(this);
        this.toggleImportant = this._toggleImportant.bind(this);
        this.toggleRead = this._toggleRead.bind(this);
        this.toggleReadAll = this._toggleReadAll.bind(this);
        this.toggleSelect = this._toggleSelect.bind(this);
        this.toggleSelectAll = this._toggleSelectAll.bind(this);
    }
    state = {
        emails:     [],
        important:  0,
        searchTerm: '',
        selected:   0,
        spam:       [],
        trash:      [],
        unRead:     0,
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

        if (!localStorage.getItem('myEmails')) {
            localStorage.setItem('myEmails', JSON.stringify(emails));
            localStorage.setItem('emailsCopy', JSON.stringify(emails));
        }

        this.checkRead();
    }

    componentDidUpdate () {
        const { emails } = this.state;

        localStorage.setItem('myEmails', JSON.stringify(emails));
    }

    _checkRead () {
        const { emails } = this.state;
        let unReadEmails = 0;

        for (let i = 0; i < emails.length; i++) {
            if (emails[i].isUnread) {
                unReadEmails += 1;
            }
        }

        if (emails.length < unReadEmails) {
            unReadEmails = unReadEmails.length;
        }

        this.setState({
            unRead: unReadEmails,
        });

        localStorage.setItem('emailsCopy', JSON.stringify(emails));
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

        if (searchTerm === '') {
            this.setState({
                emails: JSON.parse(localStorage.getItem('emailsCopy')),
            });
        } else {
            this.setState(() => ({
                emails: emails.filter(
                    (email) =>
                        `${email.content} ${email.sender} ${email.subject}`
                            .toLowerCase()
                            .indexOf(searchTerm.toLowerCase()) >= 0
                ),
            }));
        }
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
        },
        () => this.checkRead()
        );
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
        },
        () => this.checkRead()
        );
    }

    _sortEmailsByDate (emails) {
        return _.sortBy(emails, (email) => moment(email.date));
    }

    _toggleImportant (event) {
        const classLabel = event.target.className.baseVal;
        const id = event.target.id;
        const { emails, important } = this.state;

        if (!event.target.children[0]) {
            return;
        }

        if (!classLabel) {
            this.setState({
                emails: emails.map((email) =>
                    email.id === id
                        ? Object.assign(email, { isImportant: true })
                        : email),
                important: important + 1,
            });
        } else {
            this.setState({
                emails: emails.map((email) =>
                    email.id === id
                        ? Object.assign(email, { isImportant: false })
                        : email),
                important: important - 1,
            });
        }
    }
    _toggleRead (event) {
        const id = event.target.id;

        const emails = JSON.parse(localStorage.getItem('myEmails'));

        this.setState(() => ({
            emails: emails.map(
                (email) =>
                    email.id === id
                        ? Object.assign(email, { isUnread: false })
                        : email
            ),
        }),
        () => this.checkRead(),
        );
    }

    _toggleReadAll () {
        const { emails } = this.state;

        this.setState(() => ({
            emails: emails.map((email) =>
                Object.assign(email, { isUnread: false })
            ),
        }),
        () => this.checkRead()
        );
    }

    _toggleSelect (event) {
        const checkBox = event.target;
        const id = event.target.id;
        const { emails, selected } = this.state;

        if (checkBox.checked) {
            this.setState(() => ({
                emails: emails.map(
                    (email) =>
                        email.id === id
                            ? Object.assign(email, {
                                isSelected: true,
                            })
                            : email
                ),
                selected: selected + 1,
            }));
        } else {
            this.setState(() => ({
                emails: emails.map(
                    (email) =>
                        email.id === id
                            ? Object.assign(email, {
                                isSelected: false,
                            })
                            : email
                ),
                selected: selected - 1,
            }));
        }
    }

    _toggleSelectAll (event) {
        const checkBox = event.target;
        const { emails } = this.state;

        if (checkBox.checked) {
            this.setState(() => ({
                emails: emails.map((email) =>
                    Object.assign(email, { isSelected: true })
                ),
                selected: emails.length,
            }));
        } else {
            this.setState(() => ({
                emails: emails.map((email) =>
                    Object.assign(email, { isSelected: false })
                ),
                selected: 0,
            }));
        }
    }

    render () {
        const {
            emails,
            important,
            selected,
            spam,
            trash,
            unRead,
        } = this.state;

        const { handleLogin, handleRemember, history, remember } = this.props;

        return (
            <div className = { Styles.inboxNav }>
                <div className = { Styles.nav }>
                    <Navigation
                        importantEmails = { important }
                        spamEmails = { spam }
                        trashedEmails = { trash }
                        unRead = { unRead }
                    />
                </div>
                <div className = { Styles.inbox }>
                    <div className = { Styles.header }>
                        <h1>Inbox { unRead }</h1>
                        <div>
                            <div>
                                <SignoutButton
                                    handleLogin = { handleLogin }
                                    handleRemember = { handleRemember }
                                    history = { history }
                                    remember = { remember }
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
                            { selected ? (
                                <button
                                    type = 'submit'
                                    onClick = { this.sendToTrash }>
                                    Move to trash
                                </button>
                            ) : null}
                            { selected ? (
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
