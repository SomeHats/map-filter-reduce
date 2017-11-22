import React from 'react';
import PropTypes from 'prop-types';
import maintainScroll from '../../../lib/maintainScroll';

export default class ConversationMessages extends React.PureComponent {
  static propTypes = {
    messages: PropTypes.arrayOf(PropTypes.node.isRequired).isRequired,
  };

  componentDidUpdate() {
    maintainScroll();
  }

  render() {
    const { messages } = this.props;
    return <div className="ConversationMessages">{messages}</div>;
  }
}
