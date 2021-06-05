import React, { useState, useEffect } from "react";
import logo from './logo.svg';
import useRequest from './hooks/useRequest';
import { apiGetCoinData, getTopCoins, apiGetFullList } from './services';
import filter from 'lodash.filter';
import useSound from 'use-sound';

import './App.css';
import tinyFartSound from './sounds/tiny-fart-c.mp3'
import medFartSound from './sounds/mid-fart-c.mp3'
import medFart2Sound from './sounds/mid-fart2-c.mp3'
import lrgFartSound from './sounds/strong-fart-c.mp3';
// import fartSound from './sounds/fart_c.mp3'
import fartSound from './sounds/fart_c.mp3'
import riffSound from './sounds/riff_c.mp3'
import coinList from './data/coinList.json';


function App() {
  const [playFart] = useSound(fartSound);
  const [playRiff] = useSound(riffSound);
  const [playTinyFartSound] = useSound(tinyFartSound);
  const [playMedFartSound] = useSound(medFartSound);
  const [playMedFart2Sound] = useSound(medFart2Sound);
  const [playLrgFartSound] = useSound(lrgFartSound);
  const inputRef = React.createRef();

  // entered home screen
  const [homeClicked, setHomeClicked] = useState(false);

  // fetch list
  const {
    loading: loadingTop10,
    response: responseTop10,
    error: errorTop10,
  } = useRequest({
    request: getTopCoins,
    runOnMount: true,
  });

  // fetch single
  const {
    makeRequest,
    loading,
    response,
    error,
  } = useRequest({
    request: apiGetCoinData,
  });

  const [coin, setCoin] = useState();
  const [coinText, changeCoinText] = useState('bitcoin');


  const getPlayFuncFromNum = (num) => {
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

  const playNoises = (change) => {
    const playFunc = getPlayFuncFromNum(change);
    playFunc && playFunc();
  }

  const handleSubmit = async (coin) => {
    if (!loading) {
      try {
        const response = await makeRequest({coin});
        const change = parseFloat(response?.usd_24h_change);
        playNoises(change);
      } catch (e) {
        return null;
      }
    }
  }

  const handleClear = () => {
    changeCoinText('');
    inputRef.current.focus();
  }

  const handleChange = (value) => {
    changeCoinText(value);
  }

  const getTotalChange = (coins) => {
    if (!coins) {
      return;
    }

    return coins.reduce((a,c) => {
      return a + c.price_change_percentage_24h;
    }, 0) / coins.length

  }

  const handleHomeClick = () => {
    const total = getTotalChange(responseTop10);
    setHomeClicked(true);
    playNoises(total);
  }

  const filtered = (coinText) ? filter(coinList, (item) => item.id.startsWith(coinText)).slice(0,10) : [];

  useEffect(() => {
    coin && handleSubmit(coin);
  }, [coin]);

  if (!homeClicked) {
    return (
      <>
        <div>How we doin today?</div>
        <button onClick={handleHomeClick}>Get full</button>
      </>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        {
          responseTop10?.map((item) => <button key={item.id} onClick={() => setCoin(item.id)}>{item.id} ${item.current_price}</button>)
        }
        <input autoCorrect="off" autoCapitalize="off" list="coins" value={coinText} onChange={(e) => handleChange(e.target.value)} ref={inputRef} />
        {!!coinText &&  <button onClick={handleClear}>clear</button> }
        <datalist id="coins">
          {filtered.map((item) => <option value={item.id} key={item.id} />)}
        </datalist>
        {!!coinText && <button onClick={() => setCoin(coinText)}>{ (loading) ? 'loading' : 'try it out'}</button> }
        <img src={logo} className="App-logo" alt="logo" />
        <div>{error}</div>
        <div>{response?.usd_24h_change}</div>
      </header>
    </div>
  );
}

export default App;
