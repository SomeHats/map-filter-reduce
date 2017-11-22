import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

const Layout = ({ children }) => (
  <div className="Layout">
    <Head>
      <title>
        Map, Filter and Reduce - An Interactive Explanation - Alex Dytrych
      </title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>

    <main>{children}</main>

    <style jsx global>{`
      html,
      body {
        width: 100%;
        height: 100%;
        font-size: 16px;
        font-family: Montserrat, sans-serif;
        background: rgb(235, 222, 255);
        padding: 0;
        margin: 0;
      }

      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }

      main {
        display: block;
        width: 100%;
        max-width: 600px;
        min-height: 100vh;
        margin: auto;
        background: white;
        box-shadow: 0 0 1em rgba(0, 0, 0, 0.1);
      }
    `}</style>

    <link
      href="https://fonts.googleapis.com/css?family=Libre+Baskerville:400,400i|Montserrat:400,600"
      rel="stylesheet"
    />
  </div>
);

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
