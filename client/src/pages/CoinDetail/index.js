import { useEffect, useRef, useState } from 'react';
import { Transition, TransitionGroup } from 'react-transition-group';

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
  COIN_CHANGE_KEY,
} from 'brains/coins';
import moment from 'moment';
import chevRight from 'images/chevRightBlackBg.png';
import girlsShopping from 'images/girlsShopping.png';
import { Line, Bar } from 'react-chartjs-2';


const Chart = ({prices, volumes}) => {
  const arrayColumn = (arr, n) => arr?.map(x => x[n]);
  const rand = () => Math.round(Math.random() * 20 - 10);
  const dates = arrayColumn(prices, 0);

  const priceData = {
    labels: dates,
    datasets: [
      {
        label: 'Price',
        data: arrayColumn(prices, 1),
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'red',
        order: 2,
      },
    ],
  };
  
  const volumeData = {
    labels: dates,
    datasets: [
      {
        label: 'Volume',
        backgroundColor: 'black',
        data: arrayColumn(volumes, 1),
        order: 1,
      },
    ]
  }

  const priceOptions = {
    responsive:true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        display: false,
        grid : {
          display : false,
        },
      },
      x: {
        ticks: {
          display: false,
        },
        grid : {
          display : false,
        },
      }
    },
    elements: {
        point:{
          pointBackgroundColor: 'rgba(0,0,0,0)',
          pointBorderColor: 'rgba(0,0,0,0)',
        }
    }
  };

  const volumeOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        display: false,
        grid : {
          display : false,
        },
      }, x: {
        display: false,
        grid : {
          display : false,
        },
      }
    },
  }

  return (
    <styles.ChartStyle>
      <div className="priceContainer"><Line data={priceData} options={priceOptions} /></div>
      <div className="volumeContainer"><Bar data={volumeData} options={volumeOptions} /></div>
    </styles.ChartStyle>
  );
}

const WhereToBuy = ({ tickers = [], symbol } = {}) => {
  const [currencyFilter, setCurrencyFileter] = useState(currency.USD);
  const [whereToBuyOpen, setWhereToBuyOpen] = useState(false);
  const targetFiltered = filterTickersByCurrencyTarget(tickers, currencyFilter);
  const filteredTickers = targetFiltered.filter(ticker => !!ticker.trade_url);

  const handleFilterSelect = () => {

  }

  const toggleWhereToBuy = () => {
    setWhereToBuyOpen(!whereToBuyOpen);
  }
  
  const handleAddClick = () => {

  }

  useEffect(() => {
    if (!targetFiltered.length && currencyFilter === currency.USD) {
      setCurrencyFileter(currency.BTC);
    }
  }, [targetFiltered, currencyFilter]);

  const BuyMenu = ({ onClose, transition}) => {
    return (
      <aside className={transition}>
        <header>
          <h3>{`Where to buy ${symbol.toUpperCase()} with ${currencyFilter.toUpperCase()}`}</h3>
          <img src={girlsShopping} alt="girls shopping" />
        </header>
        <div className="exchangeLinkList">
        {filteredTickers.map((ticker) => {
          const { last: price } = ticker || {};
          const { logo, name, identifier } = ticker?.market || {};
          const label = [name.replace(/ Exchange$/, '')];
          if (price) {
            label.push(formatPrice(price));
          }
          return (
            <Button styleSize="small" styleType="neutralBordered" key={identifier} as="a" href={ticker.trade_url} target="_blank">
                {logo && <img src={logo} className="exchangeLogo" /> }
                {label.join(': ')}
                <img src={chevRight} className="chev" />
            </Button>
          );
        })}
        </div>
        <Button styleSize="small" styleType="neutralBordered" onClick={toggleWhereToBuy}>
          Close
        </Button>
      </aside>
    );
  };
  
  return (
    <styles.WhereToBuyStyle>
      {    tickers.length &&   
        (
          <Button styleSize="small" onClick={toggleWhereToBuy}>
            Where to buy dis
          </Button>
        )
      }
      <Button styleSize="small" onClick={handleAddClick}>
        + add to your shit
      </Button>
      <TransitionGroup>
        { whereToBuyOpen && (
          <Transition in={whereToBuyOpen} timeout={{ enter: 0, exit: 300 }}>
            {(transition) => <BuyMenu transition={transition}/> }
          </Transition>
        )}
      </TransitionGroup>
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
  const change = coin ? coin[COIN_CHANGE_KEY] : null;
  const formattedChange = formatPerc(change);
  const formattedPrice = formatPrice(coin?.current_price);
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

  let priceFontSize;
  switch(formattedPrice.length) {
    case 11:
      priceFontSize = '2.4rem';
      break;
  }

  const bigPump = coinHasBigPump(coin);

  return (
    <styles.CoinDetailStyle goodOrBad={goodOrBad} bigPump={bigPump}>
      <header>
        <div>
          <div className="price" style={{fontSize: priceFontSize}}>{formattedPrice}</div>
          <div className="timeSymbolContainer">
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
      </main>
      <Chart prices={coin?.market_data?.prices} volumes={coin?.market_data?.total_volumes} />
      { (coin && tickers?.length > 0) && <WhereToBuy tickers={tickers} symbol={coin.symbol} /> }
      {footerNav}
    </styles.CoinDetailStyle>
  );
}

CoinDetail.defaultProps = {
  handleBackClick: () => null,
};

export default CoinDetail;
