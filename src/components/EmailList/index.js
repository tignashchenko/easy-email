import React from 'react';
import { array, func } from 'prop-types';

import Styles from './styles.scss';

import Email from '../Email';

const EmailList = (props) => {
    const { emails, toggleFavorite, toggleRead, handleSelections } = props;

    return (
        <div className = { Styles.list }>
            {emails.map((email) => (
                <div key = { email.id }>
                    <Email
                        email = { { ...email } }
                        handleSelections = { handleSelections }
                        toggleFavorite = { toggleFavorite }
                        toggleRead = { toggleRead }
                    />
                </div>
            ))}
        </div>
    );
};

EmailList.propTypes = {
    emails:           array.isRequired,
    handleSelections: func.isRequired,
    toggleFavorite:   func.isRequired,
    toggleRead:       func.isRequired,
};

export default EmailList;
