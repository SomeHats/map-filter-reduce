import React from 'react';
import Conversation from './lib/Conversation';
import Message from '../messages/Message';
import WelcomeMessage from '../messages/WelcomeMessage';
import start from './parts/01-start';

const initialMessages = [<WelcomeMessage key="welcome" />];

export default class MainConversation extends React.PureComponent {
  state = {};

  driver = async (say, choice) => {
    await start(this, say, choice);
  };

  render() {
    return (
      <Conversation
        driver={this.driver}
        defaultMessageComponent={Message}
        initialMessages={initialMessages}
      />
    );
  }
}
