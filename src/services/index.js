import moment from 'moment';

class Storage {

  key = null;
  expiresInMinutes = 5;

  constructor (key) {
    this.key = key;
  }
  save(json) {
    return window.localStorage.setItem(this.key, JSON.stringify(
      {time: new Date().getTime(), data: json}
    ))
  }
  hasExpried() {
    const time = this.getTime();
    if (!time) {
      return true;
    }
    const timeCreated = moment(time);
    const expirationDate = timeCreated.add(this.expiresInMinutes, 'minutes');
    return moment().isAfter(expirationDate);
  }
  hasItem() {
    return typeof this.getData() === 'object';
  }
  getTime() {
    return this.get()?.time;
  }
  get() {
    const item = window.localStorage.getItem(this.key);
    if (item) {
      try {
        const itemAsJson = JSON.parse(item);
        return itemAsJson;
      } catch (e) {
        return e;
      }
    }
  }
  getData() {
    return this.get()?.data;
  }
  getAsPromise() {
    const items = this.getData();
    if (this.hasItem()) {
      return Promise.resolve(items);
    } else {
      return Promise.reject(items);
    }
  }
}

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

// holy fuck this is expensive tho
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
export const getTopCoins = (qty = 10) => {

  if (storage.hasItem() && !storage.hasExpried()) {
    return storage.getAsPromise();
  }

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  // return Promise.resolve();
  return fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${qty}&page=1&sparkline=false`, requestOptions)
    .then(response => response.json()).then((json) => {
      storage.save(json);
      return json;
    })
}