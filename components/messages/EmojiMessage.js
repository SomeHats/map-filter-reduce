import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import TextMessage from './TextMessage';

export default class EmojiMessage extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  };

  render() {
    const { children, className, ...props } = this.props;
    return (
      <TextMessage {...props} className={cx('EmojiMessage', className)}>
        {children}
        <style jsx global>{`
          .EmojiMessage .Message-content {
            height: 3rem;
            background: none;
          }
          .EmojiMessage .Message-content span {
            transform: scale(2.5);
            margin-right: 2em !important;
          }
        `}</style>
      </TextMessage>
    );
  }
}
