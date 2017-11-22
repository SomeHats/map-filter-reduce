import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export default class Button extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    bg: PropTypes.string,
    hover: PropTypes.string,
  };

  render() {
    const { className, children, bg, hover, ...props } = this.props;
    return (
      <button className={cx('Button', className)} {...props}>
        {children}

        <style jsx>{`
          .Button {
            background: transparent;
            font: inherit;
            border: none;
            padding: 0.5em 0.75em;
            position: relative;
            cursor: pointer;
            overflow: hidden;
            white-space: no-wrap;
            z-index: 1;
            border-radius: 1.2rem;
          }
          .Button::before {
            content '';
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -2;
            background: ${bg || '#ddd'};
          }
          .Button::after {
            content: '';
            display: block;
            position: absolute;
            width: 100%;
            padding-bottom: 100%;
            margin-top: calc(-50% + 1.2em);
            border-radius: 100%;
            background: ${hover || '#c2f8ff'};
            top: 0;
            left: 0;
            z-index: -1;
            transform: scale(0);
            transition: transform 0.3s ease-out;
          }
          .Button:hover::after,
          .Button:focus::after,
          .Button:active::after {
            transform: scale(1.3);
          }
      `}</style>
      </button>
    );
  }
}
