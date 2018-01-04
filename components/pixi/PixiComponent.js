import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import EventEmitter from 'events';

export default class PixiComponent extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    style: PropTypes.object,
    run: PropTypes.func.isRequired,
    active: PropTypes.bool,
    onClose: PropTypes.func,
  };

  componentDidMount() {
    const PIXI = require('pixi.js');

    this.app = new PIXI.Application({
      width: this.props.width,
      height: this.props.height,
      resolution: window.devicePixelRatio,
      backgroundColor: 0xffffff,
    });

    this.events = new EventEmitter();
    this.events.on('close', this.handleClose);

    this.app.view.className = 'PixiComponent-canvas';
    this.container.appendChild(this.app.view);

    try {
      this.props.run(this.app, this.events);
      this.events.emit(this.props.active ? 'activate' : 'deactivate');
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('error running interactive', e);
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.width !== this.props.width ||
      prevProps.height !== this.props.height
    ) {
      this.app.renderer.resize(this.props.width, this.props.height);
      this.events.emit('resize');
    }

    if (prevProps.active !== this.props.active) {
      this.events.emit(this.props.active ? 'activate' : 'deactivate');
    }
  }

  componentWillUnmount() {
    this.app.destroy();
    this.events.removeAllListeners();
  }

  handleClose = () => {
    if (this.props.onClose) this.props.onClose();
  };

  containerRef = el => {
    this.container = el;
  };

  render() {
    const { className, style } = this.props;

    return (
      <div
        className={cx('PixiComponent', className)}
        ref={this.containerRef}
        style={style}
      >
        <style jsx global>{`
          .PixiComponent-canvas {
            display: block;
            max-width: 100%;
          }
        `}</style>
      </div>
    );
  }
}
