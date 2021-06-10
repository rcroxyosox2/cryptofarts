import Storage from 'brains/storage';

export const apiGetCoinData = ({coin = 'bitcoin'} = {}) => {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  const coinFormatted = String(coin).toLocaleLowerCase();

  return fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coinFormatted}&vs_currencies=usd&include_24hr_change=true`, requestOptions)
    .then(response => response.json().then((json) => {
      if (Object.keys(json).length) {
        const formatted = json[coinFormatted];
        return formatted;
      }
      else {
        throw new Error('bad')
      }
    }));
}

export const apiGetFullList = () => {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  const tempKey = 'getTopCoins';

  const fromStorage = window.localStorage.getItem(tempKey);
  if (fromStorage) {
    return Promise.resolve(JSON.parse(fromStorage))
  }

  return fetch("https://api.coingecko.com/api/v3/coins/list", requestOptions)
    .then(response => response.json()).then((json) => {
      window.localStorage.setItem(tempKey, JSON.stringify(json));
      return json;
    })
}

const storage = new Storage('getTopCoins');
export const getTopCoins = ({qty = 10, page = 1} = {}) => {

  if (storage.hasItem() && !storage.hasExpried()) {
    return storage.getAsPromise();
  }

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  // return Promise.resolve();

  return fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${qty}&page=${page}&sparkline=true`, requestOptions)
    .then(response => response.json()).then((json) => {
      storage.save(json);
      return json;
    })
}

// holy fuck this is expensive tho
export const megaInitialLoad = async (expires) => {

  const throttle = 250;
  let results = [];

  const fetchLoop = (page) => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    return fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=${page}&sparkline=true`, requestOptions)
      .then(response => response.json())
  }

  const heyLookRecursion = (page = 1) => {
    return fetchLoop(page).then((json) => {
      if (Array.isArray(json) && json.length > 0) {
        results = [...results, ...json];
        let timeOut = setTimeout(() => {
          heyLookRecursion(page+1).then(() => {
            clearTimeout(timeOut);
          }).catch(() => {
            clearTimeout(timeOut);
          });
        }, 50);
      }
      return results;
    }).catch((e) => {
      console.log("what the fuick?", e);
      return e;
    });
  }

  return heyLookRecursion();

}


