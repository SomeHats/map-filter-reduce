import React from 'react';
import PropTypes from 'prop-types';
import EmojiOne from 'react-emojione';

const asset = require('../../static/images/emoji.png');

const style = {
  backgroundImage: `url(${asset})`,
  width: 20,
  height: 20,
};

const Emojify = ({ children }) => (
  <EmojiOne style={style} convertUnicode convertShortnames convertAscii={false}>
    {children}
  </EmojiOne>
);

Emojify.propTypes = {
  children: PropTypes.node,
};

export default Emojify;
