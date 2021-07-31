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

const capSizesSimple = {
  [caps.TINY]: 0,
  [caps.SM]: 100_000_000,
  [caps.MID]: 1_000_000_000,
  [caps.LRG]: 10_000_000_000,
};

const getNextCapSize = (capSize, useCapSizes = capSizes) => {
  const capKeys = Object.keys(useCapSizes);
  const capIndex = capKeys.indexOf(capSize);

  return capKeys[capIndex+1];
}

const getCapSizeFromCap = (cap, useCapSizes = capSizes) => {
  const arr = Object.values(useCapSizes);
  let size;
  arr.forEach((min, i) => {
    const max = arr[i+1];
    if (cap >= min && (max ? (cap < max) : true)) {
      size = Object.keys(useCapSizes)[i];
    }
  });
  return size;
}

module.exports = {
  caps,
  capSizes,
  capSizesSimple,
  CURRENCY,
  COIN_CHANGE_KEY,
  getNextCapSize,
  getCapSizeFromCap,
};
