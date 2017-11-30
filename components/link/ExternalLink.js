import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const ExternalLink = ({ href, className, children }) => (
  <a
    href={href}
    className={cx('ExternalLink', className)}
    target="_blank"
    rel="noopener noreferrer"
  >
    {children}
  </a>
);

ExternalLink.propTypes = {
  href: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default ExternalLink;
