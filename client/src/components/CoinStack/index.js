import { useEffect, useState } from 'react';
import * as styles from './styles';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {
  Sparklines,
  SparklinesLine,
} from 'react-sparklines';
import { formatPerc, formatPrice } from 'utils';
import {
  coinHasBigPump,
  coinHasBigDump,
  COIN_CHANGE_KEY,
} from 'brains/coins';
import DetailModal from 'components/DetailModal';
import PercChangeBox from 'components/PercChangeBox';

const CoinRow = ({coin, onClick, delay}) => {
  const bigPump = coinHasBigPump(coin);
  const bigDump = coinHasBigDump(coin);
  const change = coin[COIN_CHANGE_KEY];
  const sparkLineData = coin?.sparkline_in_7d?.price?.slice(-24);
  const handleRowClick = (e) => {
    onClick(e, {coin});
  }
  return (
    <styles.CoinStackRowStyle
      onClick={handleRowClick}
      bigPump={bigPump}
      bigDump={bigDump}
      red={(change < 0)}
      green={(change >= 0)}
      delay={delay}
      >
      <styles.CoinStyleRowContainer>
        <div className="coinImgCol">
          <img src={coin.image} alt={coin.name} width="30" height="30" />
        </div>
        <div className="coinNameCol">
          <div>{coin.symbol}</div>
          <div>{coin.name }</div>
        </div>
        <div className="sparkLinePriceCol">
          <Sparklines data={sparkLineData} margin={10} height={60}>
              <SparklinesLine style={{ strokeWidth: '3', stroke: "#FF0000", fill: "none" }} />
          </Sparklines>
          <div>{formatPrice(coin.current_price)}</div>
        </div>
        <div className="percChangeCol">
          { change && <PercChangeBox>{formatPerc(change)}</PercChangeBox> }
        </div>
      </styles.CoinStyleRowContainer>
    </styles.CoinStackRowStyle>
  );
}

const CoinStack = ({
  coins, 
  animated = true, 
  onRowClick = () => null,
  _ref = null
} = {}) => {

  const [coinIdClicked, setCoinIdClicked] = useState(null);
  let unmounted = false;

  useEffect(() => {
    return () => {
      unmounted = true;
    }
  }, []);

  const handleRowClick = (e, {coin}) => {
    !unmounted && setCoinIdClicked(coin?.id)
    !unmounted && onRowClick(e, {coin});
  }
  
  const handleDetailModalClose = () => {
    !unmounted && setCoinIdClicked(false);
  }

  return (animated) ? (
    <>
      <styles.CoinStackStyle ref={_ref}>
        <TransitionGroup component={null}>
          { coins.map((coin, i) => {
            const animTime = 500;
            const delay = (animTime/4) * i;
            return (
              <CSSTransition in={true} timeout={animTime + delay} key={coin.id}>
                <CoinRow key={coin.id} coin={coin} onClick={handleRowClick} delay={delay} />
              </CSSTransition>
            );
        })}
        </TransitionGroup>
      </styles.CoinStackStyle>
      <DetailModal onModalClose={handleDetailModalClose} coinId={coinIdClicked} />
    </>
  ) : (
    <>
      <styles.CoinStackStyle>
        { coins.map((coin, i) => (<CoinRow key={coin.id} coin={coin} onClick={handleRowClick} />)) }
      </styles.CoinStackStyle>
      <DetailModal onModalClose={handleDetailModalClose} coinId={coinIdClicked} />
    </>
  );
}

export default CoinStack;
