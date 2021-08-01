import Dexie from 'dexie';
import { getIsExpired } from 'brains/general';
export const db = new Dexie('kripdoe');

const init = () => {
    db?.version(1).stores({
        myshit: '&id, coinId',
        meta: '&id,splashpageLastVisited'
    });
    return db;
};

const db = init();

export const setSplashPageLastVisited = async () => {
    const isState = await splashPageIsStale();
}

export const splashPageIsStale = async () => {
    let stale = false;
    try {
        // const coins = await db.coins.toArray();
        const meta = await db.meta.get(1);
        if (meta.splashpageLastVisited) {
            stale = getIsExpired(meta.splashpageLastVisited, (60 * 24));
        }  
    } catch(e) {
        stale = true;
    }
    return stale;
}
