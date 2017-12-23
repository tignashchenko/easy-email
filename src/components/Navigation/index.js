import React, { Component } from 'react';
import { array, number } from 'prop-types';
import { Link } from 'react-router-dom';

import Compose from '../Compose';

import Styles from './styles.scss';

import MdEmail from 'react-icons/lib/md/email';
import FaExternalLink from 'react-icons/lib/fa/external-link';
import MdCreate from 'react-icons/lib/md/create';
import MdDelete from 'react-icons/lib/md/delete';
import MdLightbulbOutline from 'react-icons/lib/md/lightbulb-outline';
import MdMarkunreadMailbox from 'react-icons/lib/md/markunread-mailbox';
import MdReport from 'react-icons/lib/md/report';

export default class Navigation extends Component {
    static propTypes = {
        importantEmails: number.isRequired,
        unRead:          number.isRequired,
        emails:          array,
        spamEmails:      array,
        trashedEmails:   array,
    }

    constructor () {
        super();

        this.toggleModal = this._toggleModal.bind(this);
    }

    state = {
        isOpen: false,
    };

    _toggleModal () {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }

    render () {
        return (
            <div className = { Styles.navigation }>
                <button type = 'submit' onClick = { this.toggleModal }>
                    Compose Email
                </button>
                <Compose
                    show = { this.state.isOpen }
                    onClose = { this.toggleModal }
                />
                <div className = { Styles.navOptions }>
                    <div className = { Styles.navOption }>
                        <MdEmail />
                        <Link to = '/inbox'>Inbox</Link>
                        <span>{this.props.unRead}</span>
                    </div>
                    <div className = { Styles.navOption }>
                        <FaExternalLink />
                        <Link to = 'sentmail'>Sent Mail</Link>
                        <span>{null}</span>
                    </div>
                    <div className = { Styles.navOption }>
                        <MdLightbulbOutline />
                        <Link to = '/important'>Important</Link>
                        <span>
                            {this.props.importantEmails
                                ? this.props.importantEmails
                                : null}
                        </span>
                    </div>
                    <div className = { Styles.navOption }>
                        <MdCreate />
                        <Link to = '/drafts'>Drafts</Link>
                        <span>{null}</span>
                    </div>
                    <div className = { Styles.navOption }>
                        <MdDelete />
                        <Link to = '/trash'>Trash</Link>
                        <span>
                            {this.props.trashedEmails.length
                                ? this.props.trashedEmails.length
                                : null}
                        </span>
                    </div>
                    <div className = { Styles.navOption }>
                        <MdReport />
                        <Link to = '/spam'>Spam</Link>
                        <span>
                            {this.props.spamEmails.length
                                ? this.props.spamEmails.length
                                : null}
                        </span>
                    </div>
                    <div className = { Styles.navOption }>
                        <MdMarkunreadMailbox />
                        <Link to = '/allmail'>All Mail</Link>
                        <span>
                            {this.props.unRead +
                            this.props.trashedEmails.length +
                            this.props.spamEmails.length
                                ? this.props.unRead +
                                  this.props.trashedEmails.length +
                                  this.props.spamEmails.length
                                : null}
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}
