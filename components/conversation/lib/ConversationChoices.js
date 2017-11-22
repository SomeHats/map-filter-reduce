import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { scrollToBottom } from '../../../lib/maintainScroll';

import ConversationChoice from './ConversationChoice';

export default class ConversationChoices extends React.PureComponent {
  static propTypes = {
    choices: PropTypes.object,
    onChoose: PropTypes.func.isRequired,
    active: PropTypes.bool,
  };

  componentDidUpdate(prevProps) {
    if (this.props.active && !prevProps.active) {
      scrollToBottom();
    }
  }

  render() {
    const { choices, active, onChoose } = this.props;

    return (
      <div
        className={cx('ConversationChoices', {
          ConversationChoices_active: active,
        })}
      >
        {Object.keys(choices || {}).map(key => (
          <ConversationChoice
            key={key}
            choice={choices[key]}
            value={key}
            onChoose={onChoose}
            hide={!active}
          />
        ))}

        <style jsx global>{`
          .ConversationChoices {
            position: fixed;
            bottom: 0;
            left: 50%;
            width: 600px;
            margin-left: -300px;
            height: 150px;
            background: white;

            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
            padding: 0.5rem;
            border-top: 2px solid rgb(189, 168, 222);
            opacity: 0;
            transform: translateY(5rem);
            transition: opacity 0.3s linear, transform 0.3s ease;
          }
          .ConversationChoices_active {
            opacity: 1;
            transform: translateY(0);
          }
          @media screen and (max-width: 600px) {
            .ConversationChoices {
              left: 0;
              width: 100%;
              margin-left: 0;
            }
          }
        `}</style>
      </div>
    );
  }
}
