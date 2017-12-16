import React from 'react';
import { func, object } from 'prop-types';

import MdStarOutline from 'react-icons/lib/md/star-outline';

import Styles from './styles.scss';

const Email = (props) => {
    const { email, toggleFavorite, toggleRead, toggleSelect } = props;

    return (
        <div className = { email.isUnread ? Styles.emailUnread : Styles.emailRead }>
            <input
                checked = { email.isSelected }
                id = { email.id }
                type = 'checkbox'
                onChange = { toggleSelect }
            />
            <MdStarOutline
                className = { email.isFavorite ? Styles.favorite : null }
                id = { email.id }
                onClick = { toggleFavorite }
            />
            <div
                className = { Styles.senderSubject }
                id = { email.id }
                onClick = { toggleRead }>
                <div
                    className = { Styles.sender }
                    id = { email.id }
                    onClick = { toggleRead }>
                    {email.sender}
                </div>
                <div
                    className = { Styles.subject }
                    id = { email.id }
                    onClick = { toggleRead }>
                    {email.subject}
                </div>
            </div>
            <div className = { Styles.date }>{email.date}</div>
        </div>
    );
};

Email.propTypes = {
    email:          object.isRequired,
    toggleFavorite: func.isRequired,
    toggleRead:     func.isRequired,
    toggleSelect:   func.isRequired,
};

export default Email;
