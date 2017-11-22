export default async (convo, say, choice) => {
  await say('Hi!');
  await say("I'm Alex :)");
  await say("How're you?");
  const how = await choice({
    good: 'Pretty good!',
    awful: 'the worst',
  });

  await say(`You chose ${how}`);
};
