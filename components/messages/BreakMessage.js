import React from 'react';
import PropTypes from 'prop-types';

export default class BreakMessage extends React.PureComponent {
  static propTypes = {
    onNext: PropTypes.func.isRequired,
  };

  componentDidMount() {
    setTimeout(() => this.props.onNext(), 500);
  }

  render() {
    return <div />;
  }
}
