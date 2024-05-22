/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';

export function getTextFromJSX(element) {
  if (typeof element === 'string' || typeof element === 'number') {
    return element.toString();
  }

  if (Array.isArray(element)) {
    return element.map(getTextFromJSX).join('');
  }

  if (React.isValidElement(element)) {
    // @ts-ignore
    return getTextFromJSX(element?.props?.children);
  }

  return '';
}
