import React from 'react';
import Conversation from './lib/Conversation';
import TextMessage from '../messages/TextMessage';
import WelcomeMessage from '../messages/WelcomeMessage';
import start from './parts/01-start';

const initialMessages = [<WelcomeMessage key="welcome" />];

export default class MainConversation extends React.PureComponent {
  state = {};

  driver = async methods => {
    await start(this, methods);
  };

  render() {
    return (
      <Conversation
        driver={this.driver}
        defaultMessageComponent={TextMessage}
        initialMessages={initialMessages}
      />
    );
  }
}
