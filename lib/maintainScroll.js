import scrollTo from './scrollTo';

let currentScrollHeight;
let scrollingElement;

if (process.browser) {
  currentScrollHeight = document.scrollingElement.scrollHeight;
  scrollingElement = document.scrollingElement || document.documentElement;
}

export const scrollToBottom = () => {
  scrollTo(
    scrollingElement,
    scrollingElement.scrollHeight - scrollingElement.offsetHeight,
    100,
  );
};

export default () => {
  const nextScrollHeight = scrollingElement.scrollHeight;
  const delta = nextScrollHeight - currentScrollHeight;

  if (delta !== 0) {
    scrollTo(scrollingElement, scrollingElement.scrollTop + delta, 200);
  }

  currentScrollHeight = nextScrollHeight;
};
