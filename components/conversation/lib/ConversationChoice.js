import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Button from '../../button/Button';
import Emojify from '../../emoji/Emojify';

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
      <Button
        className={cx('ConversationChoice', { ConversationChoice_hide: hide })}
        onClick={this.handleClick}
      >
        <Emojify>{choice}</Emojify>
        <style jsx global>{`
          .ConversationChoice {
            margin: 0.25rem 0.5rem;
            /* animation: 0.3s ConversationChoice-in
              cubic-bezier(0.175, 0.885, 0.32, 1.275) both; */
          }
          .ConversationChoice_hide {
            /* animation: 0.3s ConversationChoice-out
              cubic-bezier(0.6, -0.28, 0.735, 0.045) both; */
          }
          .ConversationChoice:nth-child(1) {
            animation-delay: 0.1s;
          }
          .ConversationChoice:nth-child(2) {
            animation-delay: 0.15s;
          }
          .ConversationChoice:nth-child(3) {
            animation-delay: 0.2s;
          }
          .ConversationChoice:nth-child(4) {
            animation-delay: 0.25s;
          }
          .ConversationChoice:nth-child(5) {
            animation-delay: 0.3s;
          }
          .ConversationChoice:nth-child(6) {
            animation-delay: 0.35s;
          }
          .ConversationChoice:nth-child(7) {
            animation-delay: 0.4s;
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
      </Button>
    );
  }
}
