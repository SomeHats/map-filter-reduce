import React from 'react';

// import start from '../../conversation/01-start';
import map from '../../conversation/02-map';

import TextMessage from '../messages/TextMessage';
import WelcomeMessage from '../messages/WelcomeMessage';
import Conversation from './lib/Conversation';

const initialMessages = [<WelcomeMessage key="welcome" />];

export default class MainConversation extends React.PureComponent {
  state = {
    intoIt: 0,
    alreadyKnow: 0,
  };

  driver = async methods => {
    // await start(this, methods);
    await map(this, methods);
  };

  changeBy(prop, delta) {
    this.setState(state => ({
      [prop]: state[prop] + delta,
    }));
  }

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
