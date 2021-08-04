import moment from 'moment';

// When to expire all data
// export const expiresInMinutes = 5;

export const getIsExpired = (time, expiresInMinutes) => {
  const timeCreated = moment(time);
  const expirationDate = timeCreated.add(expiresInMinutes, 'minutes');
  return moment().isAfter(expirationDate);
}

export const getIsBeforeToday = (time) => {
  const today = moment().startOf('day');
  return moment(time).isBefore(today);
}
