import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export default class ConversationChoice extends React.PureComponent {
  static propTypes = {
    value: PropTypes.string,
    choice: PropTypes.string,
    onChoose: PropTypes.func.isRequired,
    hide: PropTypes.bool,
  };

  handleClick = () => {
    this.props.onChoose(this.props.value);
  };

  render() {
    const { choice, hide } = this.props;

    return (
      <button
        className={cx('ConversationChoice', { ConversationChoice_hide: hide })}
        onClick={this.handleClick}
      >
        {choice}
        <style jsx global>{`
          .ConversationChoice {
            background: transparent;
            font: inherit;
            border: none;
            padding: 0.5rem 0.75rem;
            position: relative;
            z-index: 1;
            cursor: pointer;
            overflow: hidden;
            white-space: no-wrap;
            border-radius: 1.2rem;
            margin: 0.5rem;
            animation: 0.3s ConversationChoice-in cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
          }
          .ConversationChoice_hide {
            animation: 0.3s ConversationChoice-out cubic-bezier(0.6, -0.28, 0.735, 0.045) both;
          }
          .ConversationChoice:nth-child(2) { animation-delay: 0.05s }
          .ConversationChoice:nth-child(3) { animation-delay: 0.10s }
          .ConversationChoice:nth-child(4) { animation-delay: 0.15s }
          .ConversationChoice:nth-child(5) { animation-delay: 0.20s }
          .ConversationChoice:nth-child(6) { animation-delay: 0.25s }
          .ConversationChoice:nth-child(7) { animation-delay: 0.30s }

          .ConversationChoice::before {
            content '';
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -2;
            background: #ddd;
          }
          .ConversationChoice::after {
            content: '';
            display: block;
            position: absolute;
            width: 100%;
            padding-bottom: 100%;
            margin-top: calc(-50% + 1.2rem);
            border-radius: 100%;
            background: #c2f8ff;
            top: 0;
            left: 0;
            z-index: -1;
            transform: scale(0);
            transition: transform 0.3s ease-out;
          }
          .ConversationChoice:hover::after {
            transform: scale(1.3);
          }
          @keyframes ConversationChoice-in {
            from {
              opacity: 0;
              transform: scale(0);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          @keyframes ConversationChoice-out {
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
      </button>
    );
  }
}
