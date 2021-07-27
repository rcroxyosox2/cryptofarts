import { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import * as styles from './styles';
import { getGreensReds } from 'services/';
import socket from 'services/socket';
import Button from 'theme/Button';
import CoinStack from 'components/CoinStack';
import PointTo from 'components/PointTo';
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

const GreensReds = () => {
  const socketName = 'greensreds';
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [greensReds, setGreensReds] = useState(null);
  const [greenRedSelection, setGreenRedSelection] = useState(null);
  const [capSelection, setCapSelection] = useState(null);
  const [animated, setAnimated] = useState(false);

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
    .off(socketName, socketFn)
    .on(socketName, socketFn);

  }, [])

  const handleFilter = (setFn) => (e, filterType) => {
    if ([greenRedSelection,capSelection].includes(filterType)) {
      return;
    }
    setAnimated(false);
    setFn && setFn(filterType);
  }

  const key = `${capSelection}${greenRedSelection}`;
  const filteredCoins = (key && greensReds) ? greensReds[key] : null;
  return (
    <styles.GreensRedsStyle>
      <PointTo />
      <nav>
        <div>
          <div>
            <div className="imgWrapper">
              <CSSTransition in={greenRedSelection === 'green'} timeout={300} >
                <img {...getRandomGreenImgStyle()} />
              </CSSTransition>
              <CSSTransition in={greenRedSelection === 'red'} timeout={300} >
                <img {...getRandomRedImgStyle()} />
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
        {
          greensReds && filteredCoins && <CoinStack animated={animated} coins={filteredCoins} />
        }
        {
          greensReds && filteredCoins && !filteredCoins.length && <div> Dang no <mark className={greenRedSelection}>{greenRedSelection}Z</mark> found</div>
        }
      </main>
    </styles.GreensRedsStyle>
  );
};

export default GreensReds;
