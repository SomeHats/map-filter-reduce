import React from 'react';
import Emojify from '../emoji/Emojify';

const WelcomeMessage = () => (
  <header className="WelcomeMessage">
    <h1>Map, Filter &amp; Reduce</h1>
    <h2>Some sort of explanation I guess</h2>
    <h3>
      <Emojify>
        By ✨ <a href="https://twitter.com/somehats">Alex</a> ✨
      </Emojify>
    </h3>

    <style jsx global>{`
      .WelcomeMessage {
        padding: 3rem 2rem;
      }
      .WelcomeMessage h1,
      .WelcomeMessage h2,
      .WelcomeMessage h3 {
        margin: 0;
        padding: 0;
        font-family: 'Libre Baskerville', Montserrat, serif;
        font-weight: 400;
        text-align: center;
      }
      .WelcomeMessage h2 {
        padding-top: 1rem;
        font-style: italic;
      }
      .WelcomeMessage h3 {
        padding-top: 2rem;
      }
    `}</style>
  </header>
);

export default WelcomeMessage;
