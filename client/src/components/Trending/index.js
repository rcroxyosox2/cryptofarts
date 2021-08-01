import { useEffect, useState } from 'react';
import { getTrending } from 'services/';
import { getTrendingThunk, setTrending } from 'redux/trending';
import socket from 'services/socket';
import trendingImg from './images/trending.png';
import longCloudImg from './images/longcloud.png';
import shortCloudImg from './images/shortcloud.png';
import { 
  COIN_CHANGE_KEY,
  coinSocketName,
} from 'brains/coins';
import { useDispatch, useSelector } from 'react-redux';
import { formatPerc } from 'utils';
import * as styles from './styles';

const RainBow = () => {
  return (
    <styles.RainBowStyle>
      <i /><i /><i /><i /><i />
    </styles.RainBowStyle>
  );
}

const Trending = (props) => {
  const socketName = 'trending';
  const { data: trending, loading, error } = useSelector((state) => state.trending);
  const dispatch = useDispatch();
  
  const socketFn = (res) => {
    dispatch(setTrending(res));
  };

  const socketCoinsFn = () => {
    dispatch(getTrendingThunk());
  }

  useEffect(() => {
    dispatch(getTrendingThunk())

    socket
    .on(socketName, socketFn)

    return () => {
      socket
      .off(socketName, socketFn)
    }
  }, []);

  const handleClick = (coinId) => (e) => {
    props.handleDetailModalOpen(coinId);
  }

  return (
    <styles.TrendingStyle>
      <header>
        <img src={trendingImg} alt="trending" className="trending" />
      </header>
      <styles.CloudBox className="longCloud"><img src={longCloudImg} alt="long cloud" /></styles.CloudBox>
      <styles.CloudBox className="shortCloud"><img src={shortCloudImg} alt="short cloud" /></styles.CloudBox>
      <div className="rainbowContainer"><RainBow /></div>
      <ul>
        { trending?.map((item) => {
          const change = item[COIN_CHANGE_KEY];
          return (
            <li key={item.id} onClick={handleClick(item.id)}>
              <img src={item.image} />
              <span>{item.name}</span>
              <aside className={`change ${(change < 0) ? 'bad' : 'good'}`}>
                {formatPerc(change)}
              </aside>
              <aside className='price'>${item.current_price}</aside>
            </li>
          );
        }) }
      </ul>
    </styles.TrendingStyle>
  );
}

export default Trending;