import styled, { css } from 'styled-components';

export const ModalContainerInnerStyle = styled.div.attrs({className: 'ModalInnerContainerStyle'})`
  margin: 0 auto;
  max-width: 500px;
`;

const ModalContainerStyle = styled.div.attrs({className: 'ModalContainerStyle'})`
  transition: opacity 320ms ease-out, transform 320ms ease-out;
  background: transparent;
  position: fixed;
  display: flex;
  overflow-x: hidden;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;
  width: 100%;
  height: 100%;
  z-index: 101;
  justify-content: center;
  align-items: flex-start;
  top: 0;
  left: 0;
  ${props => {
    let translateY = '-2%';
    let opacity = '0';
    let scale = '0.7';
    let overflow = 'hidden';

    if (props.animationStatus === 'entered') {
      opacity = '1';
      translateY = '0';
      scale = '1';
      overflow = 'auto';
    }
    return css`
      opacity: ${opacity};
      transform: translateY(${translateY}) scale(${scale});
      overflow-y: ${overflow};
    `;
  }}
  @media only screen and (max-width: ${ props => props.theme.responsive.largestMobileScreen}) {
    display: block;
    background: ${props => props.dark ? 'black' : 'white'};
  }
`;

const CloseContainerStyle = styled.div.attrs({className: 'CloseContainerStyle'})`
  width: 100%;
  position: absolute;
  right: 0;
  top: 0;
`;

const ModalContentStyle = styled.div.attrs({className: 'ModalContentStyle'})`
  transition: all 320ms ease-in-out;
  background: ${props => props.dark ? 'black' : 'white'};
  box-sizing: border-box;
  margin: 5% 0;
  position: relative;
  max-width: ${ props => props.maxWidth };
  @media only screen and (max-width: ${ props => props.theme.responsive.largestMobileScreen}) {
    width: 100%;
    margin: 0;
    box-shadow: none;
  }
`;

export {
  CloseContainerStyle,
  ModalContainerStyle,
  ModalContentStyle
}