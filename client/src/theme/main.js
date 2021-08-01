import { css } from 'styled-components';

const responsive = {
  mobileSmBreakpoint: '320px',
  mobileMidBreakpoint: '375px',
  mobileLrgBreakpoint: '414px',
  tabletBreakpoint: '768px',
  computerBreakpoint: '992px',
  largeMonitorBreakpoint: '1000px',
  widescreenMonitorBreakpoint: '192px'
};

responsive.largestMobileScreen = `${(parseInt(responsive.tabletBreakpoint, 10) - 1)}px`;
responsive.largestTabletScreen = `${(parseInt(responsive.computerBreakpoint, 10) - 1)}px`;
responsive.largestSmallMonitor = `${(parseInt(responsive.largeMonitorBreakpoint, 10) - 1)}px`;
responsive.largestLargeMonitor = `${(parseInt(responsive.widescreenMonitorBreakpoint, 10) - 1)}px`;

const colors = {
  white: '#FFFFFF',
  yellow: '#FFFF00',
  pink: '#FF00FF',
  red: '#FF0000',
  black: '#000000',
  blue: '#0000FF',
  green:  '#00FF00',
};


export const badCSS = css`
  background: ${colors.red};
  color: ${colors.white};
`;

export const warnCSS = css`
  background: ${colors.yellow};
  color: ${colors.black};
`;

export const goodCSS = css`
  background: ${colors.green};
`;

export const neutralCSS = css`
  background: ${colors.black};
  color: ${colors.white};
`;

export const lrgCapCSS = css`
  ${goodCSS}
`;

export const midCapCSS = css`
  ${warnCSS};
`;

export const smCapCSS = css`
  background: ${colors.pink};
  color: ${colors.white};
`;

export const neutralBorderedCSS = css`
  background: ${colors.black};
  color: ${colors.white};
  border: 1px solid ${colors.white};
  box-shadow: none;
`;

export const neutralInverseBorderedCSS = css`
  background: ${colors.white};
  color: ${colors.black};
  border: 1px solid ${colors.black};
  box-shadow: none;
`;

const button = {
  defaults: css`
    font-family: 'Comic Neue';
    font-weight: bold;
    font-size: 1rem;
    border-radius: 10vw;
    box-shadow: 0.2em 0.3em 0 ${colors.black};
    color: ${colors.black};
    position: relative;
    display: inline-flex;
    flex-flow: row nowrap;
    align-items: center;
    text-decoration: none;
    &:active {
      box-shadow: none;
      transform: translate(0.3em, 0.2em);
    }
  `,
  styleType: {
    good: goodCSS,
    bad: badCSS,
    default: css`
      ${neutralCSS};
      box-shadow: none;
    `,
    neutralBordered: neutralBorderedCSS,
    neutralInverseBordered: neutralInverseBorderedCSS,
  },
  styleSize: {
    small: css`
      padding: 0.7rem 1.1rem;
      font-size: 1.2rem;
    `,
    default: css`
      padding: 1em;
      font-size: 1.5rem;
    `,
    large: css`
      padding: 2em;
      font-size: 2rem;
    `,
  }
}

const mainTheme = {
  snippets: {
    badCSS,
    warnCSS,
    goodCSS,
    neutralCSS,
  },
  button,
  colors,
  responsive,
};

export default mainTheme;
