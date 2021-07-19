import { useEffect, useState } from 'react';
import { getTrending } from 'services/';
import trendingImg from './images/trending.png';
import longCloudImg from './images/longcloud.png';
import shortCloudImg from './images/shortcloud.png';
import * as styles from './styles';

const RainBow = () => {
  return (
    <styles.RainBowStyle>
      <i /><i /><i /><i /><i />
    </styles.RainBowStyle>
  );
}

const Trending = () => {
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