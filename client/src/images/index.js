import badImages from './bad';
import goodImages from './good';
import pumpImages from './pumps';
import dumpImages from './dumps';

import { randomResource } from 'utils';

export const getRandomBadImgStyle = () => randomResource(badImages);
export const getRandomGoodImgStyle = () => randomResource(goodImages);
export const getRandomPumpImg = () => randomResource(pumpImages);
export const getRandomDumpImg = () => randomResource(dumpImages);