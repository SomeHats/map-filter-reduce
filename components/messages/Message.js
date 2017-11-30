import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export default class Message extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    onNext: PropTypes.func.isRequired,
    fromUser: PropTypes.bool,
  };

  render() {
    const { className, children, fromUser } = this.props;
    return (
      <div
        className={cx('Message', className, {
          Message_fromUser: fromUser,
          Message_fromUs: !fromUser,
        })}
      >
        <div className="Message-content">{children}</div>
        <style jsx global>{`
          .Message {
            max-width: 80%;
            width: auto;
            overflow: hidden;
          }
          .Message_fromUser {
            margin-left: auto;
          }
          .Message::after {
            content: '';
            display: block;
            clear: both;
          }
          .Message-content {
            float: left;
            display: inline-block;
            padding: 0.5rem 0.75rem;
            margin: 1rem 1rem 0 1rem;
            background: rgb(142, 84, 233);
            border-radius: 1.2em;
            color: white;
            animation: Message-in-fromLeft 0.2s ease-out both;
          }
          .Message_fromUser .Message-content {
            float: right;
            background: #ddd;
            color: black;
            animation-name: Message-in-fromRight;
          }
          .Message_fromUs + .Message_fromUs .Message-content {
            margin-top: 0.2rem;
          }
          .Message_fromUser + .Message_fromUser .Message-content {
            margin-top: 0.2rem;
          }
          @keyframes Message-in-fromLeft {
            from {
              transform-origin: center left;
              opacity: 0;
              transform: scale(0) translateX(-10rem);
            }
            to {
              opacity: 1;
              transform: scale(1) translateX(0);
            }
          }
          @keyframes Message-in-fromRight {
            from {
              transform-origin: center right;
              opacity: 0;
              transform: scale(0) translateX(10rem);
            }
            to {
              opacity: 1;
              transform: scale(1) translateX(0);
            }
          }
        `}</style>
      </div>
    );
  }
}
