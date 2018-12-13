import axios from 'axios';

const baseUrl = axios.create({
  baseURL: global.__apiUrl__
});

export const getUserById = (id) => (baseUrl.get(`/user/${id}`));

export const fetchMessgeasBetween = (from, to) => baseUrl.get(`/messages/${from}/${to}`);
// export const putMessage = (from, to, message) => ();