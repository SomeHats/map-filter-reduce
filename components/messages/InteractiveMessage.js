import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import withWindowSize from 'react-window-size';

import PixiComponent from '../pixi/PixiComponent';
import Message from './Message';

class InteractiveMessage extends React.PureComponent {
  static propTypes = {
    onNext: PropTypes.func.isRequired,
    run: PropTypes.func.isRequired,
    windowWidth: PropTypes.number.isRequired,
    windowHeight: PropTypes.number.isRequired,
  };

  state = {
    active: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.active && this.state.active) {
      this.activate();
    }

    if (prevState.active && !this.state.active) {
      this.deactivate();
    }

    if (
      prevState.active &&
      this.state.active &&
      (prevProps.windowWidth !== this.props.windowWidth ||
        prevProps.windowHeight !== this.props.windowHeight)
    ) {
      this.resize();
    }
  }

  activate() {
    const { windowWidth, windowHeight } = this.props;

    const width = Math.min(600, windowWidth);
    const left = (windowWidth - width) / 2;

    // lock scrolling
    document.body.style.overflow = 'hidden';

    // get canvas and current position
    const canvas = this.pixiComponent.app.view;
    const bbox = canvas.getBoundingClientRect();

    // get canvas into main target position
    document.body.appendChild(canvas);
    canvas.style.position = 'fixed';
    canvas.style.top = 0;
    canvas.style.left = `${left}px`;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${windowHeight}px`;

    // reposition it back where it came from
    const x = bbox.x - left;
    const scale = bbox.width / width;
    const transform = `translate(${x}px, ${bbox.y}px) scale(${scale})`;
    canvas.style.transformOrigin = '0 0';
    canvas.style.transition = 'transform 0.3s ease-in-out';
    canvas.style.transform = transform;

    // force reflow so transition works
    canvas.getBoundingClientRect();

    // animate
    canvas.style.transform = '';
  }

  deactivate() {
    const { windowWidth } = this.props;

    const width = Math.min(600, windowWidth);
    const left = (windowWidth - width) / 2;

    // get canvas and target position
    const canvas = this.pixiComponent.app.view;
    const bbox = this.sizer.getBoundingClientRect();

    // animate back into position
    const x = bbox.x - left;
    const scale = bbox.width / width;
    const transform = `translate(${x}px, ${bbox.y}px) scale(${scale})`;
    canvas.style.transform = transform;

    // after animation...
    setTimeout(() => {
      // clear style overrides
      canvas.style.position = '';
      canvas.style.top = '';
      canvas.style.left = '';
      canvas.style.width = '';
      canvas.style.height = '';
      canvas.style.transition = '';
      canvas.style.transformOrigin = '';
      canvas.style.transform = '';

      // place correctly in document
      this.pixiComponent.container.appendChild(canvas);

      // restore scroll
      document.body.style.overflow = '';
    }, 300);
  }

  resize() {
    const canvas = this.pixiComponent.app.view;

    const { windowWidth, windowHeight } = this.props;

    const width = Math.min(600, windowWidth);
    const left = (windowWidth - width) / 2;

    canvas.style.top = 0;
    canvas.style.left = `${left}px`;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${windowHeight}px`;
  }

  handleClick = () => {
    this.setState(({ active }) => ({ active: !active }));
  };

  handleClose = () => {
    this.setState({ active: false });
  };

  pixiRef = component => {
    this.pixiComponent = component;
  };

  sizerRef = el => {
    this.sizer = el;
  };

  render() {
    const { run, windowWidth, windowHeight } = this.props;
    const { active } = this.state;

    const width = Math.min(600, windowWidth);
    const height = windowHeight;

    const style = { width: `${width * 0.4}px`, height: `${height * 0.4}px` };

    return (
      <Message
        className={cx('InteractiveMessage', {
          InteractiveMessage_active: active,
        })}
      >
        <div className="InteractiveMessage-cover" onClick={this.handleClick} />

        <PixiComponent
          ref={this.pixiRef}
          width={width}
          height={height}
          run={run}
          active={active}
          style={style}
          onClose={this.handleClose}
        />

        <div
          className="InteractiveMessage-sizer"
          style={style}
          ref={this.sizerRef}
        />

        <style jsx global>{`
          .InteractiveMessage .Message-content {
            padding: 0;
            border: 4px solid rgb(142, 84, 233);
            background: white;
          }
          .InteractiveMessage-cover {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.8);
            cursor: pointer;
            z-index: 1;
            opacity: 1;
            transition: all 0.4s 0.3s ease;
          }
          .InteractiveMessage_active .InteractiveMessage-cover {
            opacity: 0;
          }
          .InteractiveMessage-cover::after {
            content: '';
            display: block;
            position: absolute;
            width: 0;
            height: 0;
            top: 50%;
            left: 50%;
            margin-top: -1.5rem;
            margin-left: -1rem;
            border-width: 1.5rem 0 1.5rem 2.5rem;
            border-style: solid;
            border-color: transparent;
            border-left-color: rgb(142, 84, 233);
            opacity: 0.7;
            transition: opacity 0.2s ease;
          }
          .InteractiveMessage-cover::before {
            content: '';
            display: block;
            position: absolute;
            width: 5rem;
            height: 5rem;
            top: 50%;
            left: 50%;
            margin-top: -2.5rem;
            margin-left: -2.5rem;
            border-radius: 100%;
            border: 0.3rem solid rgb(142, 84, 233);
            opacity: 0.7;
            transition: opacity 0.2s ease;
          }
          .InteractiveMessage-cover:hover::after,
          .InteractiveMessage-cover:hover::before {
            opacity: 1;
          }
          .InteractiveMessage .PixiComponent {
            position: absolute;
            transition: all 0.3s ease;
          }
        `}</style>
      </Message>
    );
  }
}

export default withWindowSize(InteractiveMessage);
