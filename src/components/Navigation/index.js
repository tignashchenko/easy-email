import React from 'react';
import { number } from 'prop-types';

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
                <span>Inbox</span>
                <span>{props.emailCount}</span>
            </div>
            <div className = { Styles.navOption }>
                <FaExternalLink />
                <span>Sent Mail</span>
                <span>5</span>
            </div>
            <div className = { Styles.navOption }>
                <MdLightbulbOutline />
                <span>Important</span>
                <span>5</span>
            </div>
            <div className = { Styles.navOption }>
                <MdCreate />
                <span>Drafts</span>
                <span>5</span>
            </div>
            <div className = { Styles.navOption }>
                <MdDelete />
                <span>Trash</span>
                <span>5</span>
            </div>
            <div className = { Styles.navOption }>
                <MdReport />
                <span>Spam</span>
                <span>5</span>
            </div>
            <div className = { Styles.navOption }>
                <MdMarkunreadMailbox />
                <span>All Mail</span>
                <span>5</span>
            </div>
        </div>
    </div>
);

Navigation.propTypes = {
    emailCount: number.isRequired,
};

export default Navigation;
