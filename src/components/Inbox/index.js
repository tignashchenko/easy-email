import React, { Component } from 'react';
import _ from 'lodash';

import EmailList from '../EmailList';
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
        this.toggleFavorite = this._toggleFavorite.bind(this);
        this.sortEmailsByDate = this._sortEmailsByDate.bind(this);
    }
    state = {
        emails: [],
    };

    componentWillMount () {
        this.getEmails();
        this.setState((prevState) => ({
            emails: this.sortEmailsByDate(prevState.emails),
        }));
    }

    componentDidMount () {
        // localStorage.setItem('myEmails', JSON.stringify(this.state.emails));
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
                    isUnread:   true,
                    sender,
                    subject:    `${subject.charAt(0).toUpperCase()}${subject.slice(
                        1
                    )}`,
                });
            }
        });
    }

    _sortEmailsByDate (emails) {
        return _.sortBy(emails, (email) => moment(email.date));
    }

    _toggleFavorite (event) {
        const id = event.target.id;
        const { emails } = this.state;

        this.setState(() => ({
            emails: emails.map((email) => email.id === id ? Object.assign(email, { isFavorite: !email.isFavorite }) : email),
        }));
    }

    render () {
        const { emails } = this.state;

        return (
            <div className = { Styles.inbox }>
                <div className = { Styles.header }>
                    <h1>Inbox</h1>
                    <div>
                        <input placeholder = 'Search' type = 'text' />
                        <button type = 'submit'>
                            <MdSearch />
                        </button>
                    </div>
                </div>
                <div>
                    <EmailList
                        emails = { [...emails] }
                        toggleFavorite = { this.toggleFavorite }
                    />
                </div>
            </div>
        );
    }
}
