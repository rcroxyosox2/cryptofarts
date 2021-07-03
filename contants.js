const CURRENCY = 'usd';

const caps = {
  TINY: 'tiny',
  SM: 'sm',
  MID: 'mid',
  LRG: 'lrg',
}

const capSizes = {
  [caps.TINY]: 0,
  [caps.SM]: 100_000_000,
  [caps.MID]: 1_000_000_000,
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
  getNextCapSize,
};
