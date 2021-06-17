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
  green:  '#00FF00',
}

const badCSS = css`
  background: ${colors.red};
  color: ${colors.white};
`;

const goodCSS = css`
  background: ${colors.green};
`;

const neutralCSS = css`
  background: ${colors.black};
  color: ${colors.white};
`;

const button = {
  defaults: css`
    font-family: 'Comic Neue';
    font-weight: bold;
    font-size: 1rem;
    border-radius: 50px;
    box-shadow: 0.2em 0.3em 0 ${colors.black};
    color: ${colors.black};
    &:active {
      box-shadow: none;
      margin-top: 0.2em;
      margin-left: 0.3em;
    }
  `,
  styleType: {
    good: goodCSS,
    bad: badCSS,
    default: css`
      ${neutralCSS};
      box-shadow: none;
    `,
  },
  styleSize: {
    small: css`
      padding: 0.5em 1em;
    `,
    default: css`
      padding: 1em 2em;
    `,
  }
}

const mainTheme = {
  snippets: {
    badCSS,
    goodCSS,
    neutralCSS,
  },
  button,
  colors,
  responsive,
};

export default mainTheme;
