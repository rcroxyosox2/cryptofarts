import moment from 'moment';
import lodash from 'lodash';

// When to expire all data
export const expiresInMinutes = 5;

export const getIsExpired = (time) => {
  const timeCreated = moment(time);
  const expirationDate = timeCreated.add(expiresInMinutes, 'minutes');
  return moment().isAfter(expirationDate);
}

export const isGreenDay = (v) => lodash.toNumber(v) > 0;
