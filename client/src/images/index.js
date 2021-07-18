import badImageStyles, { images as badImages } from './bad';
import goodImageStyles, { images as goodImages } from './good';
import { images as greenImages } from './greens';
import { images as redImages } from './reds';
import pumpImageStyles from './pumps';
import dumpImageStyles from './dumps';
import { randomResource } from 'utils';
import * as styles from './styles';

const AnimatedImage = ({children, imgProps}) => {
  const { className, ...rest } = imgProps;
  return (
    <styles.AnimatedImageStyle className={className}>
      { imgProps ? <img {...rest} /> : children}
    </styles.AnimatedImageStyle>
  );
}

export const getRandomBadImg = ({ animated = true } ={}) => 
  animated 
  ? <AnimatedImage imgProps={randomResource(badImages)} /> 
  : <img {...randomResource(badImages)} />;

export const getRandomGoodImg = ({ animated = true } ={}) => 
  animated 
  ? <AnimatedImage imgProps={randomResource(goodImages)} /> 
  : <img {...randomResource(goodImages)} />;

export const getRandomBadImgStyle = () => randomResource(badImageStyles);
export const getRandomGoodImgStyle = () => randomResource(goodImageStyles);
export const getRandomPumpImgStyle = () => randomResource(pumpImageStyles);
export const getRandomDumpImgStyle = () => randomResource(dumpImageStyles);
export const getRandomGreenImgStyle = () => randomResource(greenImages);
export const getRandomRedImgStyle = () => randomResource(redImages);
