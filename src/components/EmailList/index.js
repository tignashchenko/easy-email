import React from 'react';
import { array, func } from 'prop-types';

import Email from '../Email';

const EmailList = (props) => {
    const { emails, toggleFavorite } = props;

    return (
        <div>
            {emails.map((email) => (
                <div key = { email.id }>
                    <Email email = { { ...email } } toggleFavorite = { toggleFavorite } />
                </div>
            ))}
        </div>
    );
};

EmailList.propTypes = {
    emails:         array.isRequired,
    toggleFavorite: func.isRequired,
};

export default EmailList;
