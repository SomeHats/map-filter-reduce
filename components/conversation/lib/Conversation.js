import React from 'react';
import PropTypes from 'prop-types';

import delay from '../../../lib/delay';
import ConversationMessages from './ConversationMessages';
import ConversationChoices from './ConversationChoices';

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
    onResolveChoice: () => {},
  };

  componentWillMount() {
    if (this.props.initialMessages) {
      this.setState({ messages: this.props.initialMessages });
    }
  }

  componentDidMount() {
    this.props.driver({
      say: this.say,
      choice: this.choice,
      delay: delay,
    });
  }

  async offerChoice(choices) {
    return new Promise(resolve => {
      this.setState({
        choices,
        choicesActive: true,
        onResolveChoice: value => {
          this.setState({ choicesActive: false });
          resolve(value);
        },
      });
    });
  }

  say = (message, options = {}) => {
    if (typeof message === 'string') {
      const DefaultMessage = this.props.defaultMessageComponent;
      return this.say(<DefaultMessage>{message}</DefaultMessage>, options);
    }

    return new Promise(resolve => {
      const element = React.cloneElement(message, {
        onNext: resolve,
        fromUser: false,
        key: this.idCounter++,
        ...options,
      });
      this.setState(({ messages }) => ({
        messages: [...messages, element],
      }));
    });
  };

  choice = async choices => {
    const value = await this.offerChoice(choices);
    await this.say(choices[value], { fromUser: true });
    await delay(300);
    return value;
  };

  render() {
    const { messages, choices, choicesActive, onResolveChoice } = this.state;
    return (
      <div className="Conversation">
        <ConversationMessages messages={messages} />
        <ConversationChoices
          choices={choices}
          active={choicesActive}
          onChoose={onResolveChoice}
        />

        <style jsx global>{`
          .Conversation {
            position: relative;
            min-height: 100vh;
            padding-bottom: calc(150px + 1rem);
          }
        `}</style>
      </div>
    );
  }
}
