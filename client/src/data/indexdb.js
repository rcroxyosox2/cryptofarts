import Dexie from 'dexie';
import { getIsExpired } from 'brains/general';
export const db = new Dexie('cryptofarts');

export const init = () => {
    db?.version(1).stores({
        coins: '&id,symbol,name,image,current_price,market_cap,market_cap_rank,fully_diluted_valuation,total_volume,high_24h,low_24h,price_change_24h,price_change_percentage_24h,market_cap_change_24h,market_cap_change_percentage_24h,circulating_supply,total_supply,max_supply,ath,ath_change_percentage,ath_date,atl,atl_change_percentage,atl_date,roi,last_updated,*sparkline_in_7d',
        meta: '&id,lastupdated,totalPriceChangePerc'
    });
    return db;
};

export const isStale = async (db) => {
    let stale = true;
    try {
        const coins = await db.coins.toArray();
        const meta = await db.meta.get(1);
        if (!coins || coins.length === 0) {
            stale = true
        } else if (meta.lastupdated) {
            stale = getIsExpired(meta.lastupdated);
        }        
    } catch(e) {
        stale = true;
    }
    return stale;
}
