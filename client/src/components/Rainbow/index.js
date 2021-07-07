import styled from 'styled-components';
import rainbow from 'images/rainbow.gif'

export const RainbowImgStyle = styled.div`
  background-image: url(${rainbow});
  background-size: 100%;
  display: inline-block;
  width: 4vh;
  height: 29vh;
`;

export const RainbowStyle = styled.div`
  text-align: center;
  width: 100%;
  display: inline-flex;
  justify-content: center;
  ${RainbowImgStyle} {
    &:nth-child(odd) {
      transform: rotate(180deg);
    }
  }
`;

const Rainbow = ({ count = 1 } = {}) => {
  const rainbows = [];
  for(let i = 0; i < count; i++) {
    rainbows.push(<RainbowImgStyle />);
  }
  return (
    <RainbowStyle>
      {rainbows}
    </RainbowStyle>
  );
};

export default Rainbow;
