import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import SyntaxHighlighter, {
  registerLanguage,
} from 'react-syntax-highlighter/light';
import langJs from 'react-syntax-highlighter/languages/hljs/javascript';
import style from 'react-syntax-highlighter/styles/hljs/atelier-cave-light';

import TextMessage from './TextMessage';

registerLanguage('javascript', langJs);

const toLines = str => str.split('\n');
const fromLines = lines => lines.join('\n');
const blankRe = /^\s*$/;
const isBlankLine = str => blankRe.test(str);
const getIndentationLength = line => {
  const match = line.match(/^\s*/);
  if (!match) return 0;
  return match[0].length;
};

const trimBlankLines = lines => {
  const trimmed = lines.slice();
  while (trimmed.length) {
    if (isBlankLine(trimmed[0])) {
      trimmed.shift();
    } else if (isBlankLine(trimmed[trimmed.length - 1])) {
      trimmed.pop();
    } else {
      break;
    }
  }

  return trimmed;
};

const normaliseIndentation = lines => {
  const indentationLengths = lines
    .filter(line => !isBlankLine(line))
    .map(getIndentationLength);

  const minIndentation = Math.min(...indentationLengths);

  return lines.map(line => line.slice(minIndentation));
};

const preprocess = code => {
  const lines = toLines(code);
  const trimmed = trimBlankLines(lines);
  const normalised = normaliseIndentation(trimmed);
  return fromLines(normalised);
};

const customStyle = {
  padding: 0,
  margin: 0,
  background: 'transparent',
};

export default class CodeMessage extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    code: PropTypes.string.isRequired,
    className: PropTypes.string,
  };

  render() {
    const { children, className, code, ...props } = this.props;
    return (
      <TextMessage className={cx('CodeMessage', className)} {...props}>
        <SyntaxHighlighter
          language="javascript"
          style={style}
          customStyle={customStyle}
        >
          {preprocess(code)}
        </SyntaxHighlighter>

        {children}

        <style jsx global>{`
          .CodeMessage .Message-content {
            background: white;
            border: 4px solid rgb(142, 84, 233);
          }
        `}</style>
      </TextMessage>
    );
  }
}
