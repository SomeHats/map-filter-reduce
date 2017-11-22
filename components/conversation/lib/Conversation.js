import React from 'react';
import PropTypes from 'prop-types';

import ConversationMessages from './ConversationMessages';

export default class Conversation extends React.PureComponent {
  static propTypes = {
    driver: PropTypes.func.isRequired,
    defaultMessageComponent: PropTypes.func.isRequired,
    initialMessages: PropTypes.arrayOf(PropTypes.node),
  };

  idCounter = 0;

  state = {
    messages: [],
    choices: null,
  };

  componentWillMount() {
    if (this.props.initialMessages) {
      this.setState({ messages: this.props.initialMessages });
    }
  }

  componentDidMount() {
    this.props.driver(this.say);
  }

  say = message => {
    if (typeof message === 'string') {
      const DefaultMessage = this.props.defaultMessageComponent;
      return this.say(<DefaultMessage>{message}</DefaultMessage>);
    }

    return new Promise(resolve => {
      const element = React.cloneElement(message, {
        onNext: resolve,
        fromUser: false,
        key: this.idCounter++,
      });
      this.setState(({ messages }) => ({
        messages: [...messages, element],
      }));
    });
  };

  render() {
    const { messages } = this.state;
    return (
      <div className="Conversation">
        <ConversationMessages messages={messages} />
      </div>
    );
  }
}
