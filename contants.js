const CURRENCY = 'usd';
const COIN_CHANGE_KEY = 'price_change_percentage_24h';

const caps = {
  TINY: 'tiny',
  SM: 'sm',
  MID: 'mid',
  MID2: 'mid2',
  MID3: 'mid3',
  LRG: 'lrg',
}

const capSizes = {
  [caps.TINY]: 0,
  [caps.SM]: 100_000_000,
  [caps.MID]: 1_000_000_000,
  [caps.MID2]: 5_000_000_000,
  [caps.MID3]: 8_000_000_000,
  [caps.LRG]: 10_000_000_000,
};

const getNextCapSize = (capSize) => {
  const capKeys = Object.keys(capSizes);
  const capIndex = capKeys.indexOf(capSize);
  return capKeys[capIndex+1];
}

module.exports = {
  caps,
  capSizes,
  CURRENCY,
  COIN_CHANGE_KEY,
  getNextCapSize,
};
