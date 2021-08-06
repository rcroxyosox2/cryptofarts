import { useEffect, useRef, useState } from 'react';
import { CSSTransition, Transition, TransitionGroup } from 'react-transition-group';
import { useTheme } from 'styled-components';
import numeral from 'numeral';
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
import AddRemoveShitButton from 'components/AddRemoveShitButton';
import {
  coinHasBigPump,
  filterTickersByCurrencyTarget,
  currency,
  currencySymbol,
  COIN_CHANGE_KEY,
} from 'brains/coins';
import PointTo from 'components/PointTo';
import moment from 'moment';
import chevRight from 'images/chevRightBlackBg.png';
import girlsShopping from 'images/girlsShopping.png';
import whoCaresImg from 'images/whoCares.gif';
import ErrorScreen from 'components/ErrorScreen';
import { Line, Bar } from 'react-chartjs-2';


const Chart = ({prices, volumes, goodOrBad}) => {
  const arrayColumn = (arr, n) => arr?.map(x => x[n]);
  const rand = () => Math.round(Math.random() * 20 - 10);
  const theme = useTheme();
  const dates = arrayColumn(prices, 0);

  const priceData = {
    labels: dates,
    datasets: [
      {
        label: 'Price',
        data: arrayColumn(prices, 1),
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: (goodOrBad === 'good') ? theme.colors.green : theme.colors.red,
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

const WhereToBuy = ({ 
  tickers = [], 
  coinId,
  symbol, 
  whereToBuyOpen: whereToBuyOpenFromProps, 
  onWhereToBuyOpen 
} = {}) => {

  const [currencyFilter, setCurrencyFileter] = useState(currency.USD);
  const [whereToBuyOpen, setWhereToBuyOpen] = useState(whereToBuyOpenFromProps);
  const targetFiltered = filterTickersByCurrencyTarget(tickers, currencyFilter);
  const filteredTickers = targetFiltered.filter(ticker => !!ticker.trade_url);
  let unmounted = false;

  const handleFilterSelect = (e) => {
    const v = e.target.value;
    v && !unmounted && setCurrencyFileter(v);
  }

  const toggleWhereToBuy = () => {
    !unmounted && onWhereToBuyOpen(!whereToBuyOpen);
    !unmounted && setWhereToBuyOpen(!whereToBuyOpen);
  }

  useEffect(() => {
    if (whereToBuyOpenFromProps != whereToBuyOpen) { 
      !unmounted && setWhereToBuyOpen(whereToBuyOpenFromProps);
    }
  }, [whereToBuyOpenFromProps])

  useEffect(() => {
    if (!targetFiltered.length && currencyFilter === currency.USD) {
      !unmounted && setCurrencyFileter(currency.BTC);
    }
  }, [targetFiltered, currencyFilter]);

  useEffect(() => {
    return () => {
      unmounted = true;
    }
  }, []);

  const CurrencySelect = () => {
    return (
      <Button as="select" onChange={handleFilterSelect} value={currencyFilter} styleSize="small" styleType="neutralBordered" >
        {Object.keys(currency).map((k) => {
          const v = currency[k];
          return <option value={k} key={String(currency[k])}>{currency[k]}</option>
        })}
      </Button>
    );
  }

  const BuyMenu = ({ onClose, transition}) => {

    const currencySymbolToUse = currencySymbol[currencyFilter];

    return (
      <aside className={transition}>
        <button className="closeBt" onClick={toggleWhereToBuy} />
        <header>
          <h3>{`Where to buy ${symbol.toUpperCase()} with `}<CurrencySelect /></h3>
          <img src={girlsShopping} alt="girls shopping" />
        </header>
        <div className="exchangeLinkList">
        {filteredTickers.map((ticker, i) => {
          const { last: price } = ticker || {};
          const { logo, name, identifier } = ticker?.market || {};
          const label = [name.replace(/ Exchange$/, '')];
          if (price) {
            label.push(formatPrice(price, currencySymbolToUse));
          }
          return (
            <Button styleSize="small" styleType="neutralBordered" key={identifier+i} as="a" href={ticker.trade_url} target="_blank">
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
      <div className="navAndAside">
        {    tickers.length &&   
            (
              <Button styleSize="small" onClick={toggleWhereToBuy}>
                Where to buy dis
              </Button>
            )
          }
      </div>
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

const NerdStuff = ({coin}) => {

  if (!coin) {
    return null;
  }

  const nerdTableItems = [
    {
      title: 'Low 24hr',
      val: formatPrice(coin?.low_24h),
    },
    {
      title: 'High 24hr',
      val: formatPrice(coin?.high_24h),
    },
    {
      title: 'Market Cap',
      val: formatPrice(coin?.market_cap)
    },
    {
      title: 'Circulating Supply',
      val: numeral(coin?.circulating_supply).format('0,0'),
    },
    {
      title: 'Total Supply',
      val: numeral(coin?.total_supply).format('0,0'),
    },
    {
      title: 'Total Volume',
      val: numeral(coin?.total_volume).format('0,0'),
    }
  ];
  const NerdRow = ({ rowTitle, rowValue }) => <li><span>{rowTitle}</span><span>{rowValue}</span></li>;
  const desc = coin.description?.en;
  return (
    <styles.NerdStuffStyle>
      <ul>
        {nerdTableItems.map((item) => <NerdRow rowTitle={item.title} rowValue={item.val} key={item.title} />)}
      </ul>
      {desc && (      
        <p>
          <img src={whoCaresImg} alt="who cares" />
          <span dangerouslySetInnerHTML={{__html: desc}} />
        </p>
      )}
    </styles.NerdStuffStyle>
  )
}

const Loading = ({ isLoading }) => {
  return (
    <CSSTransition in={isLoading} timeout={500}>
      <styles.LoadingStyle>
        <div className="graphic" />
        <div className="text" />
      </styles.LoadingStyle>
    </CSSTransition>
  );
}

const CoinDetail = (props) => {
  const coinId = props.coinId;
  const buttonRef = useRef();
  const [whereToBuyOpen, setWhereToBuyOpen] = useState();
  let unmounted = false;

  const { 
    response: tickers, 
    loading: whereToBuyLoading, 
    makeRequest: whereToBuyRequest,
  } = useRequest({
    request: getWhereToBuy,
  })
  const { 
    response, 
    loading, 
    error, 
    makeRequest 
  } = useRequest({
    request: getCoinById,
  });

  useEffect(async () => {
    if (coinId) {
      try {
        !unmounted && await makeRequest(coinId);
        !unmounted && await whereToBuyRequest(coinId);
      } catch(e) {
        // bugsnagging on the BE
      }
    }
  }, [coinId]);

  useEffect(() => {
    buttonRef.current?.focus();
  }, [response])

  useEffect(() => {
    return () => {
      unmounted = true;
    }
  }, [])

  const { coin, comparisonCoin, advice } = response || {};

  const change = coin ? coin[COIN_CHANGE_KEY] : null;
  const formattedChange = formatPerc(change);
  const formattedPrice = formatPrice(coin?.current_price);
  const goodOrBad = change < 0 ? 'bad' : 'good' ;
  const footerNav = (
    <FooterNav 
      leftNav={(
        <FooterButton onClick={props.handleBackClick} _ref={buttonRef}>Back</FooterButton>
      )}
    />
  );

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
      changeFontSize = '4rem';
      break;
  }

  let priceFontSize;
  switch(formattedPrice.length) {
    case 11:
      priceFontSize = '2.4rem';
      break;
  }

  const handleAdviceClick = (e, {buy}) => {
    !unmounted && Boolean(buy) && setWhereToBuyOpen(!whereToBuyOpen);
  }

  const handleOnWhereToBuyOpen = (v) => {
    if (v !== whereToBuyOpen && !unmounted) {
      setWhereToBuyOpen(v);
    }
  }

  const bigPump = coinHasBigPump(coin);

  if (error) {
    return <ErrorScreen />;
  }
  
  return (
    <>
      <Loading isLoading={loading} />
      <CSSTransition in={!loading} timeout={500}>
        <styles.CoinDetailStyle goodOrBad={goodOrBad} bigPump={bigPump}>
          <header>
            <div>
              <div className="price" style={{fontSize: priceFontSize}}>{formattedPrice}</div>
              <div className="timeSymbolContainer">
                <div className="symbolName">
                  <span>{coin?.symbol}</span>
                  <span>{coin?.name}</span>
                </div>
              </div>
            </div>
            <div>
              <div className="img">
                { coin?.image && <img src={coin?.image} /> }
                <div className="pumpArm" />
              </div>
              <div className="percChange" style={{fontSize: changeFontSize}}>
                {change && formattedChange}
              </div>
            </div>
          </header>
          <main>
            {comparisonCoin  && <PumpMessage name={coin?.name} cap={coin?.market_cap} compareName={comparisonCoin.name} compareCap={comparisonCoin.market_cap} /> }
            { advice && <CelebAdviceInline advice={advice} onAdviceClick={handleAdviceClick} />}
          </main>
          <Chart goodOrBad={goodOrBad} prices={coin?.market_data?.prices} volumes={coin?.market_data?.total_volumes} />
          <nav className="buttonNav">
          <PointTo type={PointTo.messageTypes.SCROLLFOR} />

            { 
            (coin && tickers?.length > 0) 
              && <WhereToBuy coinId={coin.id} tickers={tickers} symbol={coin.symbol} whereToBuyOpen={whereToBuyOpen} onWhereToBuyOpen={handleOnWhereToBuyOpen} /> 
            }
            <AddRemoveShitButton coinId={coinId} />
          </nav>
          <main>
            <NerdStuff coin={coin} />
          </main>
          {footerNav}
        </styles.CoinDetailStyle>
      </CSSTransition>
    </>
  );
}

CoinDetail.defaultProps = {
  handleBackClick: () => null,
};

export default CoinDetail;
