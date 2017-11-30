import React from 'react';
import BeginMessage from '../components/messages/BeginMessage';
import TextMessage from '../components/messages/TextMessage';
import BreakMessage from '../components/messages/BreakMessage';
import EmojiMessage from '../components/messages/EmojiMessage';
import ExternalLink from '../components/link/ExternalLink';

export default async (convo, { say, choice, delay }) => {
  await say(<BeginMessage />);

  await say('Hi!');
  await say("I'm Alex ✨");
  await say(
    "I'm gonna talk a bit about some really great tools for working with lists of data in code.",
  );
  await say('Have you done much programming before?');

  const howMuchCode = await choice({
    none: 'None',
    aLittle: 'A little',
    some: 'Some',
    loads: 'ALL THE CODE 👩‍💻',
  });

  if (howMuchCode === 'none') {
    await say('Ok!');
    await say(
      "This thing is intended for folks who've written a little code before",
    );
    await say("That's not a big deal - I'll try and keep this jargon free");

    const learnCode = await choice({
      ok: 'Sounds good!',
      learn: 'Where could I learn to code?',
    });
    if (learnCode === 'learn') {
      convo.setState({ extraDefinitions: true });
      await codeResources();
    } else {
      await say(<EmojiMessage>🎉</EmojiMessage>);
    }
  } else if (howMuchCode === 'some' || howMuchCode === 'aLittle') {
    await say('Cool!');
    await say("I'm gonna try and keep this fairly jargon-free");
    await say(
      'I will be talking about functions and arrays quite a bit though',
    );
    await say('Are you cool with those?');
    const coolness = await choice({
      cool: 'Yup! I ❤️ arrays',
      uhh: 'probably???',
      nope: 'uhh... nope',
    });
    if (coolness === 'uhh' || coolness === 'nope') {
      convo.setState({ extraDefinitions: true });
      await say('No worries!');
      await say("I'll make sure to explain those terms when I get to them 😁");

      const learnCode = await choice({
        thanks: 'Thanks!',
        learn: 'Where can I learn more code?',
      });
      if (learnCode === 'learn') {
        await codeResources();
      } else {
        await say(<EmojiMessage>❤️</EmojiMessage>);
      }
    } else {
      await say('I ❤️ arrays too, pal');
    }
  } else if (howMuchCode === 'loads') {
    await say('WOOOOO code');
  }

  await say(<BreakMessage />);

  if (howMuchCode !== 'none') {
    await say('Which language would you say is your main one?');
    const language = await choice({
      javascript: 'JavaScript ☕️',
      ruby: 'Ruby 💎',
      python: 'Python 🐍',
      none: 'None of these choices 😕',
    });
    convo.setState({ language });

    if (language === 'javascript') {
      await say("That's great!");
      await say('The code in this is all in JS ✨');
    } else if (language === 'python') {
      await say(<EmojiMessage>🐍🐍🐍</EmojiMessage>);
      await say('This explanation is gonna be using JavaScript.');
      await say('In python, everything works more or less the same');
      await say('but looks a little bit different.');
      await sendLinkAtEnd(
        'python',
        'http://book.pythontips.com/en/latest/map_filter.html',
      );
    } else if (language === 'ruby') {
      await say(<EmojiMessage>💎💎💎</EmojiMessage>);
      await say("(kinda sucks there's no red gem emoji)");
      await delay(500);
      await say('This explanation is gonna be using JavaScript');
      await say(
        "Things aren't quite the same in ruby, but the concepts are transferable",
      );
      await sendLinkAtEnd(
        'ruby',
        'http://queirozf.com/entries/ruby-map-each-collect-inject-reject-select-quick-reference',
      );
    } else if (language === 'none') {
      await say(<EmojiMessage>😕😕😕</EmojiMessage>);
      await say('Sorry!!');
      await say(
        "We're going to be focussing on JavaScript in this explanation",
      );
      await say('but most of the concepts are transferable');

      const mad = await choice({
        ok: 'Ok! 😀',
        mad: "I'm mad you didn't include my fav language",
      });
      if (mad === 'mad') {
        await say('¯\\_(ツ)_/¯');
        await say('You could tweet me I guess?');
        await say(
          <TextMessage>
            I'm{' '}
            <ExternalLink href="https://twitter.com/somehats">
              @SomeHats
            </ExternalLink>{' '}
            on there
          </TextMessage>,
        );
        await say("I'll probably just send the ¯\\_(ツ)_/¯ again though");
        await delay(1000);
        await say('¯\\_(ツ)_/¯');
      } else {
        await say(<EmojiMessage>❤️</EmojiMessage>);
      }
    }
  } else {
    convo.setState({ language: 'none' });
  }

  async function codeResources() {
    await say('Hmmm...');
    await say(
      <TextMessage>
        You could try{' '}
        <ExternalLink href="https://www.codecademy.com/learn/learn-javascript">
          Codecademy
        </ExternalLink>?
      </TextMessage>,
    );
    await say(
      <TextMessage>
        or <ExternalLink href="https://codebar.io/">codebar</ExternalLink> if
        there's one near you
      </TextMessage>,
    );

    const work = await choice({
      cool: 'Cool!',
      work: 'Seems like a lot of work...',
    });
    if (work === 'work') {
      await say('¯\\_(ツ)_/¯');
    } else {
      await say(<EmojiMessage>🎉</EmojiMessage>);
    }
  }

  async function sendLinkAtEnd(lang, link) {
    await say(`I'll send you a link for the ${lang} equivalent at the end`);

    const getLink = await choice({
      cool: 'Cool!',
      now: 'Can I just get the link now?',
    });
    if (getLink === 'now') {
      await say(
        <TextMessage>
          <ExternalLink href={link}>Here you go</ExternalLink>
        </TextMessage>,
      );
    } else {
      await say(<EmojiMessage>🎉</EmojiMessage>);
    }
  }
};
