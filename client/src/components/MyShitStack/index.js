import { useState, useEffect } from 'react';
import { getCoinsByIds } from 'services';
import { useLiveQuery } from "dexie-react-hooks";
import { getShit } from 'data/indexdb';
import useRequest from 'hooks/useRequest';
import CoinStack from 'components/CoinStack';
import { filterCoinsByCapAndGreenRed } from 'brains/coins';
import * as styles from './styles';

const MyShitStack = ({ filters, onRowClick, sort, onCoins }) => {
  
  const coinsArr = useLiveQuery(() => getShit());

  const [filteredCoins, setFilteredCoins] = useState(null);
  const { response: coins, loading, error, makeRequest } = useRequest({
    request: getCoinsByIds,
  });

  useEffect( async() => {
    if (coins && filters) {
      const newlyFilteredCoins = filterCoinsByCapAndGreenRed(coins, filters);
      setFilteredCoins(newlyFilteredCoins);
    }
  }, [filters, coins]);

  useEffect( async() => {
    makeRequest(coinsArr);
    onCoins(coinsArr);
  }, [coinsArr]);

  const condCoins = filteredCoins || coins;
  const sortedCoins = condCoins?.sort(sort);

  return sortedCoins ? (
    <styles.MyShitStackStyle className={(Array.isArray(sortedCoins) && !sortedCoins.length) ? 'empty' : ''} >
      <CoinStack coins={sortedCoins} animated={false} onRowClick={onRowClick} />
    </styles.MyShitStackStyle>
  ) : null;
};

MyShitStack.defaultProps = {
  sort: () => null,
  onCoins: () => null,
}

export default MyShitStack;
