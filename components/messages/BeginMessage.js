import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import delay from '../../lib/delay';
import Button from '../button/Button';

export default class BeginMessage extends React.PureComponent {
  static propTypes = {
    onNext: PropTypes.func.isRequired,
  };

  state = {
    exiting: false,
    out: false,
  };

  handleClick = async () => {
    this.setState({ exiting: true });
    await delay(400);
    this.setState({ out: true });
    this.props.onNext();
  };

  render() {
    const { exiting, out } = this.state;
    return (
      <div
        className={cx('BeginMessage', {
          BeginMessage_exiting: exiting,
          BeginMessage_out: out,
        })}
      >
        <Button
          onClick={this.handleClick}
          bg="rgb(142, 84, 233)"
          hover="rgb(101, 40, 198)"
        >
          Start
        </Button>

        <style jsx global>{`
          .BeginMessage {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
            margin-bottom: -8rem;
            animation: BeginMessage-in 0.2s ease-out both;
          }
          .BeginMessage .Button {
            font-size: 1.5rem;
            color: white;
          }
          .BeginMessage_exiting {
            animation: BeginMessage-out 0.2s ease-in both;
          }
          .BeginMessage_out {
            display: none;
          }
          @keyframes BeginMessage-in {
            from {
              opacity: 0;
              transform: scale(0);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          @keyframes BeginMessage-out {
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
      </div>
    );
  }
}
