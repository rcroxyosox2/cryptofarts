import * as styles from './styles';
import CurrencyFormat from 'react-currency-format';

import {
  Sparklines,
  SparklinesLine,
} from 'react-sparklines';
import {
  coinHasBigPump,
  coinHasBigDump,
  COIN_CHANGE_KEY,
} from 'brains/coins';

const CoinRow = ({coin}) => {

  const bigPump = coinHasBigPump(coin);
  const bigDump = coinHasBigDump(coin);
  const change = coin[COIN_CHANGE_KEY];
  const sparkLineData = coin?.sparkline_in_7d?.price?.slice(-24);
  return (
    <styles.CoinStackRowStyle bigPump={bigPump} bigDump={bigDump}>
      <styles.CoinStyleRowContainer>
        <div style={{flex: '20%'}} className="coinNameCol">
          <div>{coin.symbol}</div>
          <div>{coin.name}</div>
        </div>
        <div style={{flex: '40%'}} className="sparkLinePriceCol">
          <Sparklines data={sparkLineData} margin={10} height={60}>
              <SparklinesLine style={{ strokeWidth: '3', stroke: "#FF0000", fill: "none" }} />
          </Sparklines>
        </div>
        <div className="coinImgCol">
          <img src={coin.image} alt={coin.name} width="30" height="30" />
          <div>
            <CurrencyFormat value={coin.current_price} displayType={'text'} thousandSeparator={true} prefix={'$'} />
          </div>
        </div>
        <div style={{flex: '20%'}} className="percChangeCol">
          <aside>pump dump img</aside>
          <div>{change && `${change}%`}</div>
        </div>
      </styles.CoinStyleRowContainer>
    </styles.CoinStackRowStyle>
  );
}

const CoinStack = ({coins, onRowClick}) => {
  return (
    <styles.CoinStackStyle>
      { coins.map((coin) => <CoinRow key={coin.name+coin.market_cap} coin={coin} />) }
    </styles.CoinStackStyle>
  );
}

export default CoinStack;
