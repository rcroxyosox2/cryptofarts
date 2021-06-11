import { useEffect } from 'react';
import useSound from 'use-sound';
import {
  coinPerformanceRanges,
  getItemIsInCoinRange,
} from 'brains/coins';
import tinyFartSound from 'sounds/tiny-fart-c.mp3'
import medFartSound from 'sounds/mid-fart-c.mp3'
import medFart2Sound from 'sounds/mid-fart2-c.mp3'
import lrgFartSound from 'sounds/strong-fart-c.mp3';
// import fartSound from 'sounds/fart_c.mp3'
import fartSound from 'sounds/fart_c.mp3'
import riffSound from 'sounds/riff_c.mp3'
// import useSound from 'use-sound';

const useNoises = () => {
  // const playFart = new Audio(fartSound);
  const playRiff = new Audio(riffSound);
  const playTinyFartSound = new Audio(tinyFartSound);
  const playMedFartSound = new Audio(medFartSound);
  const playMedFart2Sound = new Audio(medFart2Sound);
  const playLrgFartSound = new Audio(lrgFartSound);

  playMedFartSound.addEventListener('canplaythrough', () => {
    console.log('hel');
  }, false);

  useEffect(() => {
    playRiff.load();
    playTinyFartSound.load();
    playMedFartSound.load();
    playMedFart2Sound.load();
    playLrgFartSound.load();
  }, [])

  const getPlayNoiseFromNum = (num) => {
    const noisePoints = [
      [coinPerformanceRanges[0], playLrgFartSound],
      [coinPerformanceRanges[1], playMedFart2Sound],
      [coinPerformanceRanges[2], playMedFartSound],
      [coinPerformanceRanges[3], playTinyFartSound],
      [coinPerformanceRanges[4], playRiff],
      [coinPerformanceRanges[5], playRiff],
      [coinPerformanceRanges[6], playRiff],
      [coinPerformanceRanges[7], playRiff],
    ];

    let found;

    noisePoints.forEach((point) => {
      const [range, sound] = point;
      if(getItemIsInCoinRange(num, range)) {
        found = sound;
      }
    });


    return playMedFart2Sound;
  }

  return {
    // playFart,
    // playRiff,
    // playTinyFartSound,
    // playMedFartSound,
    // playMedFart2Sound,
    // playLrgFartSound,
    getPlayNoiseFromNum,
  }

}

export default useNoises;
