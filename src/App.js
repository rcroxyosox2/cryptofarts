import React, { useState, useEffect } from "react";
import Router from './Router';
import useRequest from './hooks/useRequest';
import useNoises from './hooks/useNoises';
import { apiGetCoinData } from './services';
import filter from 'lodash.filter';

import './App.css';
import coinList from './data/coinList.json';

function App() {
  const inputRef = React.createRef();

  // fetch single
  const {
    makeRequest,
    loading,
    response,
    error,
  } = useRequest({
    request: apiGetCoinData,
  });

  const { getPlayNoiseFromNum } = useNoises();
  const [coin, setCoin] = useState();
  const [coinText, changeCoinText] = useState('bitcoin');

  const playNoises = (change) => {
    const playFunc = getPlayNoiseFromNum(change);
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

  const filtered = (coinText) ? filter(coinList, (item) => item.id.startsWith(coinText)).slice(0,10) : [];

  useEffect(() => {
    coin && handleSubmit(coin);
  }, [coin]);

  // if (!homeClicked) {
  //   return <Home />;
  //   return (
  //     <>
  //       <div>How we doin today?</div>
  //       <button onClick={handleHomeClick}>Get full</button>
  //     </>
  //   );
  // }

/*
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
      */

  return (<Router />);
}

export default App;
