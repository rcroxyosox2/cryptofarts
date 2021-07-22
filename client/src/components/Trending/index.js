import { useEffect, useState } from 'react';
import { getTrending } from 'services/';
import { getTrendingThunk, setTrending } from 'redux/trending';
import socket from 'services/socket';
import trendingImg from './images/trending.png';
import longCloudImg from './images/longcloud.png';
import shortCloudImg from './images/shortcloud.png';
import { useDispatch, useSelector } from 'react-redux';
import * as styles from './styles';

const RainBow = () => {
  return (
    <styles.RainBowStyle>
      <i /><i /><i /><i /><i />
    </styles.RainBowStyle>
  );
}

const Trending = () => {
  const socketName = 'trending';
  const { data: trending, loading, error } = useSelector((state) => state.trending);
  const dispatch = useDispatch();
  
  const socketFn = (res) => {
    dispatch(setTrending(res));
  }

  useEffect(() => {
    dispatch(getTrendingThunk())

    socket
    .off(socketName, socketFn)
    .on(socketName, socketFn)
  }, []);

  console.log(trending);

  return (
    <styles.TrendingStyle>
      <img src={trendingImg} alt="trending" className="trending" />
      <div className="cloudContainer">
        <img src={longCloudImg} alt="long cloud" className="longCloud" />
        <img src={shortCloudImg} alt="short cloud" className="shortCloud" />
      </div>
      <RainBow />
    </styles.TrendingStyle>
  );
}

export default Trending;