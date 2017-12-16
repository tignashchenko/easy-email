import React, { Component } from 'react';
import _ from 'lodash';

import EmailList from '../EmailList';
import Navigation from '../Navigation';
import faker from 'faker';
import MdSearch from 'react-icons/lib/md/search';
import moment from 'moment';
import { v4 } from 'uuid';

import Styles from './styles.scss';

export default class Inbox extends Component {
    constructor () {
        super();

        this.createRandomDate = this._createRandomDate.bind(this);
        this.getEmails = this._getEmails.bind(this);
        this.handleEmailSearch = this._handleEmailSearch.bind(this);
        this.handlSearchTermChange = this._handleSearchTermChange.bind(this);
        this.sortEmailsByDate = this._sortEmailsByDate.bind(this);
        this.searchEmails = this._searchEmails.bind(this);
        this.toggleFavorite = this._toggleFavorite.bind(this);
        this.toggleRead = this._toggleRead.bind(this);
        this.toggleReadAll = this._toggleReadAll.bind(this);
        this.toggleSelect = this._toggleSelect.bind(this);
        this.toggleSelectAll = this._toggleSelectAll.bind(this);
    }
    state = {
        emails:     [],
        searchTerm: '',
    };

    componentWillMount () {
        this.getEmails();
        this.setState((prevState) => ({
            emails: this.sortEmailsByDate(prevState.emails),
        }));
    }

    componentDidMount () {
        const { emails } = this.state;

        localStorage.setItem('myEmails', JSON.stringify(emails));
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
                    isFavorite: false,
                    isSelected: false,
                    isUnread:   true,
                    sender,
                    subject:    `${subject.charAt(0).toUpperCase()}${subject.slice(
                        1
                    )}`,
                });
            }
        });
    }

    _handleEmailSearch (event) {
        const { searchTerm } = this.state;

        event.preventDefault();

        this.searchEmails(searchTerm);
    }

    _handleSearchTermChange (event) {
        this.setState({ searchTerm: event.target.value });
    }

    _searchEmails () {
        console.log('hi');
        const { emails, searchTerm } = this.state;

        this.setState(() => ({
            emails: emails.filter(
                (email) =>
                    `${email.content} ${email.sender} ${email.subject}`
                        .toLowerCase()
                        .indexOf(searchTerm.toLocaleLowerCase()) >= 0
            ),
        }));
    }

    _sortEmailsByDate (emails) {
        return _.sortBy(emails, (email) => moment(email.date));
    }

    _toggleFavorite (event) {
        const id = event.target.id;
        const { emails } = this.state;

        this.setState(() => ({
            emails: emails.map(
                (email) =>
                    email.id === id
                        ? Object.assign(email, {
                            isFavorite: !email.isFavorite,
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
        const { emails } = this.state;

        return (
            <div className = { Styles.inboxNav }>
                <div className = { Styles.nav }>
                    <Navigation emailCount = { emails.length } />
                </div>
                <div className = { Styles.inbox }>
                    <div className = { Styles.header }>
                        <h1>Inbox {emails.length}</h1>
                        <div>
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
                            <input id = 'move' type = 'checkbox' />
                            <label htmlFor = 'move'>Move</label>
                        </div>
                    </div>
                    <div>
                        <EmailList
                            emails = { [...emails] }
                            toggleFavorite = { this.toggleFavorite }
                            toggleRead = { this.toggleRead }
                            toggleSelect = { this.toggleSelect }
                        />
                    </div>
                </div>
            </div>
        );
    }
}
