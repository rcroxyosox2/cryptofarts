import React, { useEffect, useState } from 'react';
import { Transition } from 'react-transition-group';
import { getTopCoins } from 'services';
import { useStore } from 'store';
import useNoises from 'hooks/useNoises';
import useRequest from 'hooks/useRequest';
import Button from 'theme/Button';
import tapHereImg from 'images/tapHere.png';
import {
  getRandomBadImgStyle,
  getRandomGoodImgStyle,
} from 'images';
import * as styles from './styles';

const RandomGoodImgStyle = getRandomGoodImgStyle();
const RandomBadImgStyle = getRandomBadImgStyle()


const HomeScreenNoMyShit = ({ pageAnimationState, isGood, handleHomeClick }) => {
  const RandomImageStyle = isGood ? RandomGoodImgStyle : RandomBadImgStyle;
  const styleType = isGood() ? 'good' : 'bad';
  return (
    <styles.HomeScreenNoMyShitStyle className={pageAnimationState}>

      <styles.RandomImageContainerStyle>
        {RandomImageStyle && <RandomImageStyle className="randomImg" />}
      </styles.RandomImageContainerStyle>
      <styles.TapHereImageContainerStyle>
        <img src={tapHereImg} alt="tap here" className="tapHereImg" />
      </styles.TapHereImageContainerStyle>
      <Button onClick={handleHomeClick} styleType={styleType}>Todayz MarketZ</Button>
    </styles.HomeScreenNoMyShitStyle>
  );
}

const HomeScreenWithMyShit = () => {
  return (<div>Todo</div>)
}

const Home = () => {
  // fetch list
  const {
    loading,
    response,
    error,
  } = useRequest({
    request: getTopCoins,
    requestData: {qty: "100"},
    runOnMount: true,
  });
  const [pageLoaded, setPageLoaded] = useState(false);

  const { getPlayNoiseFromNum } = useNoises();
  const store = useStore();

  const getTotalChange = (coins) => {
    if (!coins) {
      return;
    }

    return coins.reduce((a,c) => {
      return a + c.price_change_percentage_24h;
    }, 0) / coins.length
  }

  const playNoises = (change) => {
    const playFunc = getPlayNoiseFromNum(change);
    playFunc && playFunc();
  }

  const handleHomeClick = () => {
    const total = getTotalChange(response);
    playNoises(total);
  }

  const isGood = () => true; //getTotalChange(response) > 0;
  const myShit = store.helpers.getMyShit();

  useEffect(() => {
    setPageLoaded(true)
  }, [])

  return (
    <Transition in={pageLoaded} timeout={500}>
      { pageAnimationState => (
        <styles.HomeStyle className={pageAnimationState}>
        {
          (myShit.length > 0)
            ? <HomeScreenWithMyShit pageAnimationState={pageAnimationState} />
            : <HomeScreenNoMyShit handleHomeClick={handleHomeClick} isGood={isGood} pageAnimationState={pageAnimationState}/>
        }
        </styles.HomeStyle>
      )}
    </Transition>
  );
}

export default Home;