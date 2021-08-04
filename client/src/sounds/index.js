import tinyFartSound from 'sounds/tiny-fart-c.mp3';
import medFartSound from 'sounds/mid-fart-c.mp3';
import medFart2Sound from 'sounds/mid-fart2-c.mp3';
import lrgFartSound from 'sounds/strong-fart-c.mp3';
import riffSound from 'sounds/riff_c.mp3';
import {
    coinPerformanceRanges,
    getItemIsInCoinRange,
  } from 'brains/coins';

const sounds = {
  tinyFartSound,
  medFartSound,
  medFart2Sound,
  lrgFartSound,
  riffSound,
};

export const indexes = {
    TINY_FART: 0,
    MED_FART: 1,
    MED_FART_2: 2,
    LRG_FART: 3,
    RIFF: 4,
};

export const getSoundIndexFromRange = (num) => {
    const soundPoints = [
      [coinPerformanceRanges[0], indexes.LRG_FART],
      [coinPerformanceRanges[1], indexes.MED_FART_2],
      [coinPerformanceRanges[2], indexes.MED_FART],
      [coinPerformanceRanges[3], indexes.TINY_FART],
      [coinPerformanceRanges[4], indexes.RIFF],
      [coinPerformanceRanges[5], indexes.RIFF],
      [coinPerformanceRanges[6], indexes.RIFF],
      [coinPerformanceRanges[7], indexes.RIFF],
    ];

    let found;

    soundPoints.forEach((point) => {
      const [range, index] = point;
      if(getItemIsInCoinRange(num, range)) {
        found = index;
      }
    });

    return found;
  }

  export default sounds;