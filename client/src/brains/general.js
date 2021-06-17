import moment from 'moment';

// When to expire all data
export const expiresInMinutes = 5;

export const getIsExpired = (time) => {
  const timeCreated = moment(time);
  const expirationDate = timeCreated.add(expiresInMinutes, 'minutes');
  return moment().isAfter(expirationDate);
}
