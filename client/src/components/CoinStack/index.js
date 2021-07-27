import * as styles from './styles';
import numeral from 'numeral';
import { AnimateGroup } from 'react-animation';
import { Transition, CSSTransition, TransitionGroup } from 'react-transition-group';
import {
  Sparklines,
  SparklinesLine,
} from 'react-sparklines';
import { formatPerc } from 'utils';
import {
  coinHasBigPump,
  coinHasBigDump,
  COIN_CHANGE_KEY,
} from 'brains/coins';
const PUMP_PERC_THRESHOLD = 20;

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
          <div>
            {
              String(coin.current_price).indexOf('e-') > -1
              ? `$${coin.current_price}`
              : numeral(coin.current_price).format('$0,0.00')
            }
          </div>
        </div>
        <div className="percChangeCol">
          <div>{change && formatPerc(change)}</div>
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
  return (animated) ? (
    <styles.CoinStackStyle ref={_ref}>
      <TransitionGroup component={null}>
        { coins.map((coin, i) => {
          const animTime = 500;
          const delay = (animTime/4) * i;
          return (
            <CSSTransition in={true} timeout={animTime + delay} key={coin.id}>
              <CoinRow key={coin.id} coin={coin} onClick={onRowClick} delay={delay} />
            </CSSTransition>
          );
       })}
      </TransitionGroup>
    </styles.CoinStackStyle>
  ) : (
    <styles.CoinStackStyle>
      { coins.map((coin, i) => (<CoinRow key={coin.id} coin={coin} onClick={onRowClick} />)) }
    </styles.CoinStackStyle>
  );
}

export default CoinStack;
