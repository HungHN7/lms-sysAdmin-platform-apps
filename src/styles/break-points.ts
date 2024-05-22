// @ts-nocheck

import { css } from 'styled-components';
type TypeOfMedia = (style: string) => typeof css;
type ExportOfMedia = {
  largeDesktop: TypeOfMedia;
  desktop: TypeOfMedia;
  laptop: TypeOfMedia;
  tablet: TypeOfMedia;
  mobile: TypeOfMedia;
  tablet_Landscape: TypeOfMedia;
  mobileBigger_Landscape: TypeOfMedia;
  mobile_Landscape: TypeOfMedia;
};

export const sizes = {
  largeDesktop: 1920,
  desktop: 1440,
  laptop: 1200,
  tablet: 767,
  mobileBigger: 412,
  mobile: 320,
  tablet_Landscape: 1024,
  mobileBigger_Landscape: 844,
  mobile_Landscape: 732,
};

export const sizesToEm = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = sizes[label] / 16;
  return acc;
}, {}) as { [key in keyof typeof sizes]: number };

// Iterate through the sizes and create a media template

export const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) =>
    label.includes('Landscape')
      ? css`
          @media (orientation: landscape) and (min-width: ${sizes[label] / 16}em) {
            ${css(...args)}
          }
        `
      : css`
          @media (min-width: ${sizes[label] / 16}em) {
            ${css(...args)}
          }
        `;
  return acc;
}, {});

// Have to responsive mobile first, from small to bigger

export default media as ExportOfMedia;

// example:
//   .className {${media.tablet` margin-top: 20px `}}
