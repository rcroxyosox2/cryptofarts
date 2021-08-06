import styled from 'styled-components';
import { PercChangeBoxStyle } from 'components/PercChangeBox/styles';

export const MyShitButtonAndModalStyle = styled.div`
  .myShitWrap {
    position: relative;
    ${PercChangeBoxStyle} {
      position: absolute;
      top: -40%;
      right: -20%;
      transform: rotate(3deg);
    }
  }
`;
