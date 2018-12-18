import axios from 'axios';

const baseUrl = axios.create({
  baseURL: global.__apiUrl__
});

export default {
  getUserById: (id) => (baseUrl.get(`/user/${id}`)),
  fetchMessgeasBetween: (from, to) => baseUrl.get(`/messages/${from}/${to}`),
  sendMessages: (from, to, text, sendTime) => baseUrl.post('/messages', { from, to, text, sendTime }),
  setupNamespace: () => baseUrl.put('/setup-namespace')
};