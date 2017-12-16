import React from 'react';
import { func, object } from 'prop-types';

import MdStarOutline from 'react-icons/lib/md/star-outline';

import Styles from './styles.scss';

const Email = (props) => {
    const { email, toggleFavorite } = props;

    return (
        <div
            className = { email.isUnread ? Styles.emailUnread : Styles.emailRead }>
            <input type = 'checkbox' />
            <MdStarOutline
                className = { email.isFavorite ? Styles.favorite : null }
                id = { email.id }
                onClick = { toggleFavorite }
            />
            <div className = { Styles.senderSubject }>
                <div className = { Styles.sender }>{email.sender}</div>
                <div className = { Styles.subject }>{email.subject}</div>
            </div>
            <div className = { Styles.date }>{email.date}</div>
        </div>
    );
};

Email.propTypes = {
    email:          object.isRequired,
    toggleFavorite: func.isRequired,
};

export default Email;
