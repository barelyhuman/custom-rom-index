import { h as createElement } from 'preact';
import { modsToStyle } from 'spacery';

const Box = function ({ elm = 'div', children, ...props }) {
  const { sanitizedProps, style } = modsToStyle(props, 'px');
  return createElement(
    elm,
    {
      ...sanitizedProps,
      style:{
        ...style ,
        ...props.style
      }
    },
    children
  );
};

export default Box
