import { useState, useEffect } from 'react';
import { getCoinsByIds } from 'services';
import { useLiveQuery } from "dexie-react-hooks";
import { getShit } from 'data/indexdb';
import useRequest from 'hooks/useRequest';
import CoinStack from 'components/CoinStack';
import { COIN_CHANGE_KEY } from 'brains/coins';
import { filterCoinsByCapAndGreenRed } from 'brains/coins';
import * as styles from './styles';


export const myShitSortDesc = (a,b) => {
  if(a[COIN_CHANGE_KEY] <= b[COIN_CHANGE_KEY]) { return 1; }
  if(a[COIN_CHANGE_KEY] > b[COIN_CHANGE_KEY]) { return -1; }
  return 0;
};

const MyShitStack = ({ filters, onRowClick, sort, onCoins }) => {
  
  const coinsArr = useLiveQuery(() => getShit());

  const [filteredCoins, setFilteredCoins] = useState(null);
  const { response: coins, error, makeRequest } = useRequest({
    request: getCoinsByIds,
  });

  useEffect( async() => {
    if (coins && filters) {
      const newlyFilteredCoins = filterCoinsByCapAndGreenRed(coins, filters);
      setFilteredCoins(newlyFilteredCoins);
    }
  }, [filters, coins]);

  useEffect( async() => {
    try {
      await makeRequest(coinsArr);
      onCoins(coinsArr);
    } catch (e) {
      // bugsnagging on BE
    }
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
