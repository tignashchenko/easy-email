import React, { Component } from 'react';
import { array, number } from 'prop-types';
import { Link } from 'react-router-dom';

import Styles from './styles.scss';

import MdEmail from 'react-icons/lib/md/email';
import FaExternalLink from 'react-icons/lib/fa/external-link';
import MdCreate from 'react-icons/lib/md/create';
import MdDelete from 'react-icons/lib/md/delete';
import MdLightbulbOutline from 'react-icons/lib/md/lightbulb-outline';
import MdMarkunreadMailbox from 'react-icons/lib/md/markunread-mailbox';
import MdReport from 'react-icons/lib/md/report';
import Modal from 'react-modal';

export default class Navigation extends Component {
    constructor (props) {
        super(props);

        this.afterOpenModal = this._afterOpenModal.bind(this);
        this.closeModal = this._closeModal.bind(this);
        this.openModal = this._openModal.bind(this);
    }

    state = {
        modalIsOpen: false,
    };

    _afterOpenModal () {
        this.header.style.color = '#000';
        this.header.style.marginTop = '0%';
        this.to.style.width = '100%';
        this.to.style.outline = 'none';
        this.subject.style.width = '100%';
        this.subject.style.outline = 'none';
        this.content.style.height = '13rem';
        this.content.style.width = '100%';
        this.content.style.outline = 'none';
    }

    _closeModal () {
        this.setState({ modalIsOpen: false });
    }

    _openModal () {
        this.setState({ modalIsOpen: true });
    }

    render () {
        return (
            <div className = { Styles.navigation }>
                <button type = 'submit' onClick = { this.openModal }>
                    Compose Email
                </button>
                <Modal
                    ariaHideApp = { false }
                    contentLabel = 'Example Modal'
                    isOpen = { this.state.modalIsOpen }
                    onAfterOpen = { this.afterOpenModal }
                    onRequestClose = { this.closeModal }>
                    <h2 ref = { (header) => this.header = header }>New Message</h2>
                    <form>
                        <input
                            placeholder = 'To'
                            ref = { (to) => this.to = to }
                            type = 'text'
                        />
                        <input
                            placeholder = 'Subject'
                            ref = { (subject) => this.subject = subject }
                            type = 'text'
                        />
                        <textarea cols = '50' ref = { (content) => this.content = content } rows = '20'>
                        </textarea>
                    </form>
                    <div>
                        <button>Send</button>
                        <button onClick = { this.closeModal }>Close</button>
                    </div>
                </Modal>
                <div className = { Styles.navOptions }>
                    <div className = { Styles.navOption }>
                        <MdEmail />
                        <Link to = '/inbox'>Inbox</Link>
                        <span>{this.props.unreadEmails.length}</span>
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
                            {this.props.emails.length +
                            this.props.trashedEmails.length +
                            this.props.spamEmails.length
                                ? this.props.emails.length +
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

Navigation.propTypes = {
    importantEmails: number.isRequired,
    unreadEmails:    array.isRequired,
    emails:          array,
    spamEmails:      array,
    trashedEmails:   array,
};
