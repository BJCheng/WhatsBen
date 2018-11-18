export default class Response {
  constructor() {
    this.error = '';
    this.data = {};
  }

  setError(error) {
    this.error = error;
    return this;
  }

  setData(data) {
    this.data = data;
    return this;
  }

  toJson(){
    return JSON.parse(JSON.stringify(this));
  }
}