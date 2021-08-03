import styled from 'styled-components';
import { ButtonStyle } from 'theme/Button/styles';

export const MainFooterStyle = styled.footer.attrs({ className: 'MainFooterStyle' })`
  position: sticky;
  bottom: 0;
  width: 100%;
  position: sticky;
  overflow: hidden;
  padding: 2rem 2rem 1.3rem;
  z-index: 5;
  ${ButtonStyle} {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    gap: 5px;
    img {
      width: 22px;
    }
  }
  &:before {
    content: "";
    display: block;
    background: black;
    transform: rotate(-2.5deg);
    position: absolute;
    width: calc(100% + 20px);
    height: 100%;
    bottom: -10px;
    left: -10px;
  }
  @media (max-width: ${ props => props.theme.responsive.largestMobileScreen}) {
    position: fixed;
  }
`;
