import React, { Component } from 'react';
import { bool, func } from 'prop-types';
//import Styles from './styles.scss';

export default class Compose extends Component {
    static propTypes = {
        show:    bool,
        onClose: func,
    }

    render () {
        if (!this.props.show) {
            return null;
        }

        const backdropStyle = {
            position:        'fixed',
            top:             0,
            bottom:          0,
            left:            0,
            right:           0,
            backgroundColor: 'rgba(0,0,0,0.3)',
            padding:         50,
        };

        const modalStyle = {
            backgroundColor: '#fff',
            borderRadius:    5,
            maxWidth:        500,
            minHeight:       300,
            margin:          '0 auto',
            padding:         30,
        };

        const inputStyles = {
            outline: 0,
            width:   '100%',
        };

        const footerStyles = {
            display:        'flex',
            justifyContent: 'space-between',
        };

        return (
            <div className = 'backdrop' style = { backdropStyle }>
                <div className = 'modal' style = { modalStyle }>
                    <form>
                        <div>
                            <input placeholder = 'To' style = { inputStyles } type = 'text' />
                        </div>
                        <div>
                            <input placeholder = 'Subject' style = { inputStyles } type = 'text' />
                        </div>
                        <div>
                            <textarea rows = '15' style = { inputStyles }></textarea>
                        </div>
                    </form>
                    <div className = 'footer' style = { footerStyles }>
                        <button>
                            Send
                        </button>
                        <button onClick = { this.props.onClose }>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
