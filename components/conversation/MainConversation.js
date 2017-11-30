import React from 'react';

import start from '../../conversation/01-start';

import TextMessage from '../messages/TextMessage';
import WelcomeMessage from '../messages/WelcomeMessage';
import Conversation from './lib/Conversation';

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
