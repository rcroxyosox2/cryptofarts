import moment from 'moment';
import { expiresInMinutes } from './general';

export default class Storage {

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
