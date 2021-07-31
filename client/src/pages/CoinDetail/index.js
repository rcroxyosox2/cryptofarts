import { useEffect, useRef, useState } from 'react';
import * as styles from './styles';
import { 
  getCoinById, 
  getWhereToBuy,
} from 'services/';
import useRequest from 'hooks/useRequest';
import { 
  formatPrice, 
  formatPerc,
} from 'utils';
import CelebAdviceInline from 'components/CelebAdviceInline';
import Button from 'theme/Button';
import FooterNav from 'components/FooterNav';
import {
  coinHasBigPump,
  filterTickersByCurrencyTarget,
  currency,
} from 'brains/coins';

const WhereToBuy = ({ tickers = [], symbol } = {}) => {
  const [currencyFilter, setCurrencyFileter] = useState(currency.USD);
  const [whereToBuyOpen, setWhereToBuyOpen] = useState(false);

  const handleFilterSelect = () => {

  }

  const toggleWhereToBuy = () => {
    setWhereToBuyOpen(!whereToBuyOpen);
  }
  
  const handleAddClick = () => {

  }

  const filteredTickers = filterTickersByCurrencyTarget(tickers, currencyFilter);

  const BuyMenu = ({ onClose }) => {
    return (
      <aside>
        <h3>{`Where to buy ${symbol.toUpperCase()} with ${currencyFilter.toUpperCase()}`}</h3>
        {filteredTickers.map((ticker) => {
          const { last: price } = ticker || {};
          const { logo, name } = ticker?.market || {};
          const label = [name.replace(/ Exchange$/, '')];
          if (price) {
            label.push(formatPrice(price));
          }
          return (
            <Button styleSize="small" styleType="neutralBordered">
                {logo && <img src={logo} /> }
                {label.join(': ')}
            </Button>
          );
        })}
        <Button styleSize="small" styleType="neutralInverseBordered" onClick={toggleWhereToBuy}>
          Close
        </Button>
      </aside>
    );
  };
  
  return (
    <styles.WhereToBuyStyle>
      <Button styleSize="small" onClick={toggleWhereToBuy}>
        Where to buy dis
      </Button>
      <Button styleSize="small" onClick={handleAddClick}>
        + add to your shit
      </Button>
      {whereToBuyOpen && <BuyMenu />}
    </styles.WhereToBuyStyle>
  )
} 

const FooterButton = (props) => <Button styleType="neutralInverseBordered" styleSize="small" {...props} />

const PumpMessage = ({cap, name, compareName, compareCap}) => {
  var pump =(compareCap-cap)/cap*100.0;
  return (
    <styles.PumpMessageStyle>
      {`If pepole bye as much ${name} as they did ${compareName},`}
      <mark>{` it wood pump ${formatPerc(pump)}`}</mark>
    </styles.PumpMessageStyle>
  )
}

const CoinDetail = (props) => {
  const coinId = props.coinId;
  const buttonRef = useRef();
  const { 
    response: tickers, 
    loading: whereToBuyLoading, 
    makeRequest: whereToBuyRequest,
  } = useRequest({
    request: getWhereToBuy,
  })
  const { response, loading, error, makeRequest } = useRequest({
    request: getCoinById,
  });

  useEffect(() => {
    if (coinId) {
      makeRequest(coinId);
      whereToBuyRequest(coinId);
    }
  }, [coinId]);

  useEffect(() => {
    buttonRef.current?.focus();
  }, [response])

  const { coin, comparisonCoin, advice } = response || {};
  const change = coin?.price_change_percentage_24h;
  const formattedChange = formatPerc(change);
  const goodOrBad = change < 0 ? 'bad' : 'good' ;
  const footerNav = (
    <FooterNav leftNav={(
      <FooterButton onClick={props.handleBackClick} _ref={buttonRef}>Back</FooterButton>
    )} />
  );

  if (!coin) {
    return footerNav;
  }

  let changeFontSize;
  switch(formattedChange.length) {
    case 9:
      changeFontSize = '2.5rem';
      break;
    case 8:
      changeFontSize = '2.8rem';
      break;
    case 7:
      changeFontSize = '3.1rem';
      break;
    case 6:
      changeFontSize = '3.4rem';
      break;
  }

  const bigPump = coinHasBigPump(coin);

  return (
    <styles.CoinDetailStyle goodOrBad={goodOrBad} bigPump={bigPump}>
      <header>
        <div>
          <div className="price">{formatPrice(coin.current_price)}</div>
          <div className="timeSymbolContainer">
            <div className="time">24hr</div>
            <div className="symbolName">
              <span>{coin.symbol}</span>
              <span>{coin.name}</span>
            </div>
          </div>
        </div>
        <div>
          <div className="img">
            { coin.image && <img src={coin.image} /> }
            <div className="pumpArm" />
          </div>
          <div className="percChange" style={{fontSize: changeFontSize}}>
            {change && formattedChange}
          </div>
        </div>
      </header>
      <main>
        {comparisonCoin  && <PumpMessage name={coin.name} cap={coin.market_cap} compareName={comparisonCoin.name} compareCap={comparisonCoin.market_cap} /> }
        { advice && <CelebAdviceInline advice={advice} />}
        { (coin && tickers?.length > 0) && <WhereToBuy tickers={tickers} symbol={coin.symbol} /> }
      </main>
      {footerNav}
    </styles.CoinDetailStyle>
  );
}

CoinDetail.defaultProps = {
  handleBackClick: () => null,
};

export default CoinDetail;
