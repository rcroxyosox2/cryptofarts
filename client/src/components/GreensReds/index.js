import { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import * as styles from './styles';
import { useLiveQuery } from "dexie-react-hooks";
import { getGreensReds } from 'services/';
import socket from 'services/socket';
import { getShit } from 'data/indexdb';
import CoinStack from 'components/CoinStack';
import PointTo from 'components/PointTo';
import MyShitStack from 'components/MyShitStack';

import { getRandomGreenImgStyle, getRandomRedImgStyle } from 'images/';

const FB = ({children, selection, onClick = () => null, ...props} = {}) => (
  <styles.FilterButtonStyle {...props} selected={selection === props.filterType} onClick={(e) => {
    onClick(e, props.filterType);
  }}>
    {
      (typeof children === 'string') 
      ? <span dangerouslySetInnerHTML={{__html: children.split(' ').join('<br />')}} /> 
      : <span>{children}</span>
    }
  </styles.FilterButtonStyle>
);

const GreensReds = ({ onCoinIdClicked = () => null } = {}) => {
  const socketName = 'greensreds';
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [greensReds, setGreensReds] = useState(null);
  const [greenRedSelection, setGreenRedSelection] = useState(null);
  const [capSelection, setCapSelection] = useState(null);
  const [animated, setAnimated] = useState(false);
  const myShitCoinIdArr = useLiveQuery(() => getShit());

  const socketFn = (greensReds) => {
    setAnimated(true);
    setGreensReds(greensReds);
  };

  useEffect(() => {
    setLoading(true);
    getGreensReds().then((resp) => {
      setAnimated(true);
      setLoading(false);
      setError(false);
      setGreensReds(resp);
      setGreenRedSelection('green');
      setCapSelection('lrg');
    }).catch((e) => {
      setLoading(false);
      setError(e);
      setGreensReds(null);
    });

    socket
    .on(socketName, socketFn);

    return () => {
      socket
      .off(socketName, socketFn);
    }

  }, [])

  const handleFilter = (setFn) => (e, filterType) => {
    if ([greenRedSelection,capSelection].includes(filterType)) {
      return;
    }
    setAnimated(false);
    setFn && setFn(filterType);
  }

  const key = `${capSelection}${greenRedSelection}`;
  let filteredCoins = (key && greensReds) ? greensReds[key] : null;
  filteredCoins = filteredCoins?.filter((coin) => !myShitCoinIdArr?.includes(coin.id));
  const exclaim = (greenRedSelection === 'red') ? 'Woah' : 'Dang';
  const handleRowClick = (e, {coin}) => onCoinIdClicked(coin.id);

  return (
    <styles.GreensRedsStyle>
      <PointTo />
      <nav>
        <div>
          <div>
            <div className="imgWrapper">
              <CSSTransition in={greenRedSelection === 'green'} timeout={300} >
                <img alt="green" {...getRandomGreenImgStyle()} />
              </CSSTransition>
              <CSSTransition in={greenRedSelection === 'red'} timeout={300} >
                <img alt="red" {...getRandomRedImgStyle()} />
              </CSSTransition>
            </div>
          </div>
          <FB filterType="green" selection={greenRedSelection} onClick={handleFilter(setGreenRedSelection)}>Da Greenz</FB>
          <FB filterType="red" selection={greenRedSelection} onClick={handleFilter(setGreenRedSelection)}>Da Redz</FB>
        </div>
        <div>
          <FB filterType="lrg" selection={capSelection} onClick={handleFilter(setCapSelection)} data-content="(regular risk coinz)" >
            <i />Lrg capz
          </FB>
          <FB filterType="mid" selection={capSelection} onClick={handleFilter(setCapSelection)} data-content="(riskier coinz)" >
            <i />Mid capz
          </FB>
          <FB filterType="sm" selection={capSelection} onClick={handleFilter(setCapSelection)} data-content="(most risky coinz)" >
            <i />Sm capz
          </FB>
        </div>
      </nav>
      <main>
        {loading && <div>Loading...</div>}
        <MyShitStack onRowClick={handleRowClick} filters={{
          capSelection,
          greenRedSelection,
        }} />
        {
          greensReds && filteredCoins && <CoinStack animated={animated} coins={filteredCoins} onRowClick={handleRowClick} />
        }
        {
          greensReds && filteredCoins && !filteredCoins.length && <div> {exclaim} no <mark className={greenRedSelection}>{greenRedSelection}Z</mark> found</div>
        }
      </main>
    </styles.GreensRedsStyle>
  );
};

export default GreensReds;
