import React from 'react';
import { array } from 'prop-types';
import { Link } from 'react-router-dom';

import Styles from './styles.scss';

import MdEmail from 'react-icons/lib/md/email';
import FaExternalLink from 'react-icons/lib/fa/external-link';
import MdCreate from 'react-icons/lib/md/create';
import MdDelete from 'react-icons/lib/md/delete';
import MdLightbulbOutline from 'react-icons/lib/md/lightbulb-outline';
import MdMarkunreadMailbox from 'react-icons/lib/md/markunread-mailbox';
import MdReport from 'react-icons/lib/md/report';

const Navigation = (props) => (
    <div className = { Styles.navigation }>
        <button type = 'submit'>Compose Email</button>
        <div className = { Styles.navOptions }>
            <div className = { Styles.navOption }>
                <MdEmail />
                <Link to = '/inbox'>Inbox</Link>
                <span>{props.emails.length}</span>
            </div>
            <div className = { Styles.navOption }>
                <FaExternalLink />
                <Link to = 'sentmail'>Sent Mail</Link>
                <span>{null}</span>
            </div>
            <div className = { Styles.navOption }>
                <MdLightbulbOutline />
                <Link to = '/important'>Important</Link>
                <span>{ props.importantEmails.length ? props.importantEmails.length : null }</span>
            </div>
            <div className = { Styles.navOption }>
                <MdCreate />
                <Link to = '/drafts'>Drafts</Link>
                <span>{null}</span>
            </div>
            <div className = { Styles.navOption }>
                <MdDelete />
                <Link to = '/trash'>Trash</Link>
                <span>{ props.trashedEmails.length ? props.trashedEmails.length : null }</span>
            </div>
            <div className = { Styles.navOption }>
                <MdReport />
                <Link to = '/spam'>Spam</Link>
                <span>{ props.spamEmails.length ? props.spamEmails.length: null }</span>
            </div>
            <div className = { Styles.navOption }>
                <MdMarkunreadMailbox />
                <Link to = '/allmail'>All Mail</Link>
                <span>{ props.emails.length + props.trashedEmails.length + props.spamEmails.length ?
                    props.emails.length + props.trashedEmails.length + props.spamEmails.length :
                    null }
                </span>
            </div>
        </div>
    </div>);

Navigation.propTypes = {
    emails:          array.isRequired,
    importantEmails: array,
    spamEmails:      array,
    trashedEmails:   array,
};

export default Navigation;
