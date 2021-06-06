import { css } from 'styled-components';

export const appearance = (val = 'none') => {
  return css`
    appearance: ${val};
    -ms-appearance: ${val};
    -webkit-appearance: ${val};
    -moz-appearance: ${val};
    border: none;
    background: none;
    padding: 0;
    margin: 0;
  `;
};