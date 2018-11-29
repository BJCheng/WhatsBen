export default class LocalStorage{
  static getItem(key){
    return localStorage.getItem(key);
  }

  static setItem(key, value){
    localStorage.setItem(key, value);
  }

  static getObj(key){
    return JSON.parse(localStorage.getItem(key));
  }

  static setObj(key, obj){
    localStorage.setItem(key, JSON.stringify(obj));
  }
}