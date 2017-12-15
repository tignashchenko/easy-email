import React, { Component } from 'react';
import _ from 'lodash';

import faker from 'faker';
import MdSearch from 'react-icons/lib/md/search';
import moment from 'moment';

import Styles from './styles.scss';

export default class Inbox extends Component {
    constructor () {
        super();

        this.createRandomDate = this._createRandomDate.bind(this);
        this.sortEmailsByDate = this._sortEmailsByDate.bind(this);
    }
    state = {
        emails: [],
    };

    componentWillMount () {
        this.setState((prevState) => {
            for (let i = 0; i < 100; i++) {
                const content = faker.fake('{{lorem.paragraph}}');
                const date = this.createRandomDate('2017-12-15', '2017-6-01');
                const sender = faker.fake(
                    '{{name.firstName}} {{name.lastName}}'
                );
                const subject = faker.fake('{{lorem.words}}').toString();

                prevState.emails.push({
                    content,
                    date,
                    sender,
                    subject: `${subject.charAt(0).toUpperCase()}${subject.slice(
                        1
                    )}`,
                });
            }
        });

        this.setState((prevState) => this.sortEmailsByDate(prevState.emails));
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
                .format('YYYY-MM-DD SS:mm:ss');
        }

        return moment.unix(randomNumber(endMoment.unix())).format('YYYY-MM-DD HH:mm:ss');

    }

    _sortEmailsByDate (emails) {
        return _.sortBy(emails, (email) => moment(email.date));
    }

    render () {
        return (
            <div className = { Styles.inbox }>
                <h1>Inbox</h1>
                <div className = { Styles.header }>
                    <input placeholder = 'Search' type = 'text' />
                    <button
                        type = 'submit'
                        onClick = { () => console.log('button clicked!') }>
                        <MdSearch />
                    </button>
                </div>
            </div>
        );
    }
}
