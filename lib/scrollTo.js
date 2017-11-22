// adapted from:
// https://github.com/madebysource/animated-scrollto

const requestAnimFrame =
  global.requestAnimationFrame ||
  global.webkitRequestAnimationFrame ||
  global.mozRequestAnimationFrame ||
  function(callback) {
    global.setTimeout(callback, 1000 / 60);
  };

const easeInOutQuad = (t, b, c, d) => {
  t /= d / 2;
  if (t < 1) return c / 2 * t * t + b;
  t--;
  return -c / 2 * (t * (t - 2) - 1) + b;
};

const animatedScrollTo = (element, to, duration, prop = 'scrollTop') => {
  const start = element[prop];
  const change = to - start;
  const animationStart = Date.now();

  let animating = true;
  let lastpos = null;

  const animateScroll = () => {
    if (!animating) return;

    requestAnimFrame(animateScroll);
    const now = Date.now();
    const val = Math.floor(
      easeInOutQuad(now - animationStart, start, change, duration),
    );

    if (lastpos) {
      if (lastpos === element[prop]) {
        lastpos = val;
        element[prop] = val;
      } else {
        animating = false;
      }
    } else {
      lastpos = val;
      element[prop] = val;
    }

    if (now > animationStart + duration) {
      element[prop] = to;
      animating = false;
    }
  };
  requestAnimFrame(animateScroll);
};

export default animatedScrollTo;
