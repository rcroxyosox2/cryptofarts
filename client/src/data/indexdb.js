import Dexie from 'dexie';
import { getIsExpired } from 'brains/general';
export const db = new Dexie('kripdoe');

const init = () => {
  db?.version(1).stores({
    myshit: '&coinId',
    meta: '&id,splashpageLastVisited'
  });
  return db;
};

const dbi = init();

export const setSplashPageLastVisited = async () => {
  return db.meta.put({
    id: 1,
    splashpageLastVisited: new Date().getTime()
  });
}

export const splashPageIsStale = async () => {
  const expiresInMinutes = 60 * 24;
  let stale = false;
  try {
    // const coins = await db.coins.toArray();
    const meta = await dbi.meta.get(1);
    if (meta.splashpageLastVisited) {
        stale = getIsExpired(meta.splashpageLastVisited, expiresInMinutes);
    }  
  } catch(e) {
    stale = true;
  }
  return stale;
}

export const isInShit = async (coinId) => {
  try {
    const x = await db.myshit.get({coinId});
    if (x.coinId) {
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
}

export const removeFromShit = async (coinId) => {
  return db.myshit.where('coinId').equals(coinId).delete().catch(e => console.log(e));
}

export const addToShit = async (coinId) => {
  return db.myshit.put({coinId});
}

export const getShit = () => {
  return db.table('myshit').toArray().then((arr) => {
    return arr.map(item => item.coinId);
  });
}
