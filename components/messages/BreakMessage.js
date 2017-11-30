import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import delay from '../../lib/delay';
import Message from './Message';

export default class BreakMessage extends React.PureComponent {
  static propTypes = {
    onNext: PropTypes.func.isRequired,
  };

  state = {
    exit: false,
    done: false,
  };

  async componentDidMount() {
    await delay(1300 + Math.random(500));
    this.setState({ exit: true });
    await delay(100);
    this.props.onNext();
    await delay(200);
    this.setState({ done: true });
  }

  render() {
    const { done, exit } = this.state;
    return (
      <Message
        className={cx('BreakMessage', {
          BreakMessage_done: done,
          BreakMessage_exit: exit,
        })}
        {...this.props}
      >
        <div className="BreakMessage-pip" />
        <div className="BreakMessage-pip" />
        <div className="BreakMessage-pip" />

        <style jsx global>{`
          .BreakMessage .Message-content {
            background: #ddd;
            display: flex;
            align-items: center;
            height: 1.7rem;
            animation: BreakMessage-enter 0.2s ease-out both;
          }
          .BreakMessage_exit .Message-content {
            pointer-events: none;
            animation: BreakMessage-exit 0.2s ease-in both;
          }
          .BreakMessage_done .BreakMessage-pip {
            display: none;
          }
          .BreakMessage-pip {
            display: block;
            width: 5px;
            height: 5px;
            background: #888;
            border-radius: 100%;
            margin: 0 0.15rem;
            animation: BreakMessage-pip-pulse 0.6s ease-in-out infinite;
          }
          .BreakMessage-pip:nth-child(2) {
            animation-delay: 0.1s;
          }
          .BreakMessage-pip:nth-child(3) {
            animation-delay: 0.2s;
          }
          .BreakMessage + .Message {
            margin-top: -1.2rem;
          }
          @keyframes BreakMessage-pip-pulse {
            0% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.75);
            }
            100% {
              transform: scale(1);
            }
          }
          @keyframes BreakMessage-enter {
            from {
              opacity: 0;
              transform: scale(0);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          @keyframes BreakMessage-exit {
            from {
              opacity: 1;
              transform: scale(1);
            }
            to {
              opacity: 0;
              transform: scale(0);
            }
          }
        `}</style>
      </Message>
    );
  }
}
