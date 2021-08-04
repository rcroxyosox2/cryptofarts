import styled, { css } from 'styled-components';

export const ANIM_SPEED = 200;

export const ModalContainerInnerStyle = styled.div.attrs({className: 'ModalInnerContainerStyle'})`
  margin: 0 auto;
  max-width: 500px;
`;

const ModalContainerStyle = styled.div.attrs({className: 'ModalContainerStyle'})`
  transition: opacity ${ANIM_SPEED}ms ease-out, transform ${ANIM_SPEED}ms ease-out;
  background: transparent;
  position: fixed;
  opacity: 0;
  width: 375px;
  height: 667px;
  left: 50%;
  top: 50%;
  /* margin-left: -50%;
  margin-top: -50%; */
  display: flex;
  overflow-x: hidden;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;
  z-index: 101;
  justify-content: center;
  align-items: flex-start;
  ${props => {
    let opacity = '0';
    let scale = '0.7';
    let overflow = 'hidden';

    if (props.animationStatus === 'entered') {
      opacity = '1';
      scale = '1';
      overflow = 'auto';
    }
    return css`
      opacity: ${opacity};
      transform: translate(-50%, -50%) scale(${scale});
      overflow-y: ${overflow};
    `;
  }}
  @media (max-width: ${ props => props.theme.responsive.largestMobileScreen}) {
    width: 100%;
    height: 100%;
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
  position: static;
  max-width: ${ props => props.maxWidth };
  min-height: 100%;
  width: 100%;
  margin: 0;
  @media (max-width: ${ props => props.theme.responsive.largestMobileScreen}) {
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