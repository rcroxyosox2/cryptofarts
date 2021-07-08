import 'url-search-params-polyfill';
import Storage from 'brains/storage';


export const getDay = () => {
  return fetch('/api/day').then((resp) => resp.json())
};

export const search = (term, fetchOptions) => {
  const params = new URLSearchParams({term}).toString();
  return fetch(`/api/search?${params}`).then((resp) => resp.json());
}

export const getSickDeals = () => {
  return fetch('/api/sickdeals').then((resp) => resp.json());
}

////// old 
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
export const megaInitialLoad = async ({limit2, onFetchCycle} = {}) => {

  const fetchThrottleInMS = 5;
  const fetchLoop = (page) => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    return fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=gecko_desc&per_page=250&page=${page}&sparkline=true`, requestOptions)
      .then(response => response.json())
  }


  let timeOut;
  let useRes;
  let useRej;
  let useResults = [];

  const heyLookRecursion = (page = 1, res = null, rej = null) => {
    if (res) {
      useRes = res;
    }

    if (rej) {
      useRej = rej;
    }

    return fetchLoop(page).then((json) => {
      const go = ((limit2 !== undefined) ? (page < 2) : true)
      if (go && Array.isArray(json) && json.length > 0) {
        onFetchCycle && onFetchCycle(json, page);
        useResults = [...useResults, ...json];
        return heyLookRecursion(page+1).then(() => {
          clearTimeout(timeOut);
        }).catch(() => {
          clearTimeout(timeOut);
        });
        // let timeOut = setTimeout(() => {
        //   return heyLookRecursion(page+1).then(() => {
        //     clearTimeout(timeOut);
        //   }).catch(() => {
        //     clearTimeout(timeOut);
        //   });
        // }, fetchThrottleInMS);
      }
      else {
        useRes && useRes(useResults);
      }
      return useResults;
    }).catch((e) => {
      timeOut && clearTimeout(timeOut);
      console.log("what the fuick?", e);
      useRej && useRej(e);
      return e;
    });
  }

  return new Promise((res, rej) => heyLookRecursion(1, res, rej));

}


