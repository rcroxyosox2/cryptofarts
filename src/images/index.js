import badImages from './bad';
import goodImages from './good';

import { randomResource } from 'utils';

export const getRandomBadImgStyle = () => randomResource(badImages);
export const getRandomGoodImgStyle = () => randomResource(goodImages);
