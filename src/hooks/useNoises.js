import tinyFartSound from '../sounds/tiny-fart-c.mp3'
import medFartSound from '../sounds/mid-fart-c.mp3'
import medFart2Sound from '../sounds/mid-fart2-c.mp3'
import lrgFartSound from '../sounds/strong-fart-c.mp3';
// import fartSound from '../sounds/fart_c.mp3'
import fartSound from '../sounds/fart_c.mp3'
import riffSound from '../sounds/riff_c.mp3'
import useSound from 'use-sound';

const useNoises = () => {
  const [playFart] = useSound(fartSound);
  const [playRiff] = useSound(riffSound);
  const [playTinyFartSound] = useSound(tinyFartSound);
  const [playMedFartSound] = useSound(medFartSound);
  const [playMedFart2Sound] = useSound(medFart2Sound);
  const [playLrgFartSound] = useSound(lrgFartSound);


  const getPlayNoiseFromNum = (num) => {
    console.log(num);
    const noisePoints = [
      [undefined, -10, playLrgFartSound],
      [-10, -8, playMedFart2Sound],
      [-8, -2, playMedFartSound],
      [-2, 0, playTinyFartSound],
      [0, undefined, playRiff],
    ];

    let found;
    noisePoints.forEach((x) => {
      const [min, max, sound] = x;
      if (num > (min === undefined ? num-1 : min) && num <= (max === undefined ? num+1 : max)) {
        found = sound;
      }
    });

    return found;
  }

  return {
    playFart,
    playRiff,
    playTinyFartSound,
    playMedFartSound,
    playMedFart2Sound,
    playLrgFartSound,
    getPlayNoiseFromNum,
  }

}

export default useNoises;
