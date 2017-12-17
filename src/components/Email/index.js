import React from 'react';
import { func, object } from 'prop-types';

import MdStarOutline from 'react-icons/lib/md/star-outline';

import Styles from './styles.scss';

const Email = (props) => {
    const { email, handleSelections, toggleImportant, toggleRead } = props;

    return (
        <div className = { email.isUnread ? Styles.emailUnread : Styles.emailRead }>
            <input
                checked = { email.isSelected }
                id = { email.id }
                type = 'checkbox'
                onChange = { handleSelections }
            />
            <MdStarOutline
                className = { email.isImportant ? Styles.important : null }
                id = { email.id }
                onClick = { toggleImportant }
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
    email:            object.isRequired,
    handleSelections: func.isRequired,
    toggleImportant:  func.isRequired,
    toggleRead:       func.isRequired,
};

export default Email;
