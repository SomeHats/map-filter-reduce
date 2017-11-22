import React from 'react';
import PropTypes from 'prop-types';

export default class ConversationMessages extends React.PureComponent {
  static propTypes = {
    messages: PropTypes.arrayOf(PropTypes.node.isRequired).isRequired,
  };

  render() {
    const { messages } = this.props;
    return <div className="ConversationMessages">{messages}</div>;
  }
}
