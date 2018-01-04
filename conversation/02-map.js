import React from 'react';
import BreakMessage from '../components/messages/BreakMessage';
import TextMessage from '../components/messages/TextMessage';
import CodeMessage from '../components/messages/CodeMessage';
import ExternalLink from '../components/link/ExternalLink';

export default async (convo, { say, choice }) => {
  await say(<BreakMessage />);
  await say('So!!');
  await say("Let's talk about Map");

  const feel = await choice({
    yeah: 'YEAAHhhhh!!',
    ok: 'Ok',
    ehh: 'if we must...',
  });
  if (feel === 'yeah') {
    convo.changeBy('intoIt', 1);
    await say('Love your enthusiasm 😍');
  }
  if (feel === 'ehh') {
    convo.changeBy('intoIt', -1);
    await say('Hey, feel free to leave at any time 😛');
  }

  await say(
    "in a moment we'll talk about dogs but right now, here's a function:",
  );
  await say(
    <CodeMessage
      code={`
        function double(someNumber) {
          return someNumber + someNumber;
        }
      `}
    />,
  );

  await say('Do you know what this does?');
  const knowFunction = await choice({ yes: 'Yep!', no: 'Nope!' });
  if (knowFunction === 'no') {
    await say('Ok!');
    await say("Let's go through it step by step");
    await say(
      'Programming is mostly made up of instructions that run one after another - like a recipe',
    );
    await say(
      'A function is like teaching the computer a new instruction that it can understand',
    );
    await say(
      "It's like... the first time you follow a recipe, you might not know how to boil an egg",
    );
    await say(
      "But once someone's shown you, next time someone says 'boil an egg' you'll know what to do",
    );

    await say('Does that kind of make sense?');
    const getsFunctions = await choice({ yes: 'Yes!', no: 'uhh... no' });
    if (getsFunctions === 'yes') {
      await say('Cool!');
    } else {
      await say("That's ok");
      await say("It's kind of a weird concept");
      await say("I don't really have time to do a full explainer here");
      await say(
        <TextMessage>
          Maybe check out{' '}
          <ExternalLink href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions">
            this guide here
          </ExternalLink>?
        </TextMessage>,
      );

      await choice({
        ok: "Ok, let's carry on",
        ehh: "I still don't get it, but want to continue anyway",
      });
    }

    await say(<BreakMessage />);
    await say('So this first line:');
    await say(<CodeMessage code="function double(someNumber) {" />);
    await say(
      "Says that we're making a function called double, and double needs some input: someNumber",
    );

    await say(<BreakMessage />);
    await say('The next line');
    await say(<CodeMessage code="return someNumber + someNumber" />);
    await say('grabs our two input numbers and adds them together');
    await say('Then, it gives them back to us!');

    await say('Cool?');
  }

  // await say('So in this explanation, Map is...');
  // await say('*drum roll*');
  // await say(<BreakMessage />);
  // await say('TODO: dog animation');
  // await say('A DOG!!!');
  // await say(<EmojiMessage>🐶🐕🌭🐶</EmojiMessage>);

  // const dogFeels = await choice({
  //   heart: '😍 A dog!!',
  //   think: '🤔 A dog?',
  //   ugh: '😒 A dog.',
  // });
  // if (dogFeels === 'heart') convo.changeBy('intoIt', 1);
  // if (dogFeels === 'ugh') convo.changeBy('intoIt', -1);

  // await say('Yup!');
  // await say('A magic dog called Map that loves to lick stuff 👅');
  // await choice({
  //   sparkle: '✨🔮👅',
  //   magic: "Wait, the dog's magic now??",
  //   ofc: 'Of course 🙄',
  // });
  // await say('TODO: Lick animation');
  // await say('Whenever our dog licks something, it changes in some way');

  // ---

  // await say(<BreakMessage />);
  // await say('Map works by taking a list...');
  // await say('...doing something to every item in the list...');
  // await say(
  //   '...and giving you back a new list with all the new, changed items.',
  // );
  // await say(<BreakMessage />);
  // await say('Make sense?');

  // const getsMap = await choice({
  //   yes: 'Yup!',
  //   no: 'Uhh... Not really',
  //   alreadyKnow: 'I already knew that',
  // });
  // convo.setState({ getsMapAtStart: getsMap });
  // if (getsMap === 'yes') {
  //   await say('Great!');
  //   await say("Let's go over some examples");
  // } else if (getsMap === 'no') {
  //   await say('No worries!');
  //   await say('Maybe some examples will help');
  // } else if (getsMap === 'alreadyKnow') {
  //   await say('TODO: figure out a branch here');
  // }

  // await say(<BreakMessage />);
  // await say('This is map:');
  // await say('TODO: DOG ANIMATION');
  // await say("IT'S A DOG!!!!");
  // await say(<EmojiMessage>🐶🐕🌭🐶</EmojiMessage>);
};
