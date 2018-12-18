import axios from 'axios';

export default axios.create({
  baseURL: global.__apiUrl__
});

const a = {
  getUserById: (id) => (baseUrl.get(`/user/${id}`)),
  fetchMessgeasBetween: (from, to) => baseUrl.get(`/messages/${from}/${to}`),
  sendMessages: (from, to, text, sendTime) => baseUrl.post('/messages', { from, to, text, sendTime }),
  setupNamespace: () => baseUrl.put('/setup-namespace')
};