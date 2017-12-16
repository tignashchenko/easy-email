import React from 'react';
import { array, func } from 'prop-types';

import Styles from './styles.scss';

import Email from '../Email';

const EmailList = (props) => {
    const { emails, toggleFavorite, toggleRead, toggleSelect } = props;

    return (
        <div className = { Styles.list }>
            {emails.map((email) => (
                <div key = { email.id }>
                    <Email
                        email = { { ...email } }
                        toggleFavorite = { toggleFavorite }
                        toggleRead = { toggleRead }
                        toggleSelect = { toggleSelect }
                    />
                </div>
            ))}
        </div>
    );
};

EmailList.propTypes = {
    emails:         array.isRequired,
    toggleFavorite: func.isRequired,
    toggleRead:     func.isRequired,
    toggleSelect:   func.isRequired,
};

export default EmailList;
