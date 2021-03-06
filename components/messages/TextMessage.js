import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Emojify from '../emoji/Emojify';
import Message from './Message';

export default class TextMessage extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    onNext: PropTypes.func.isRequired,
  };

  componentDidMount() {
    setTimeout(() => {
      this.props.onNext();
    }, 750 + Math.random() * 500);
  }

  render() {
    const { children, className, ...props } = this.props;
    return (
      <Message {...props} className={cx('TextMessage', className)}>
        <Emojify>{children}</Emojify>
      </Message>
    );
  }
}
