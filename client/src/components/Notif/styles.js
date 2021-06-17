import styled, { css } from 'styled-components';


export const NotifStyle = styled.div.attrs({ className: 'NotifStyle' })`
  display: flex;
  flex-flow: row nowrap;
  transform: translateY(-300px);
  transition: all 500ms ease-in-out;
  &.entering, &.entered {
    transform: translateY(0);
  }
  &.exiting, &.exited {
    transform: translateY(-300px);
  }
`;

export const NotifArticleStyle = styled(NotifStyle).attrs({ className: 'NotifArticleStyle' })`
`;

export const NotifLoadingStyle = styled(NotifStyle).attrs({ className: 'NotifArticleStyle' })`
  background: ${(props) => props.theme.colors.yellow};
  color: ${(props) => props.theme.colors.black};
`;
