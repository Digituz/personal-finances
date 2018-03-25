import axios from 'axios';
import * as Auth0 from 'auth0-web';

let apiClient;

Auth0.subscribe((authenticated) => {
  if (authenticated) {
    apiClient = axios.create({
      baseURL: 'http://localhost:3001/',
      timeout: 5000,
      headers: {
        'Authorization': `Bearer ${Auth0.getAccessToken()}`
      },
    });
  } else {
    apiClient = axios.create({
      baseURL: 'http://localhost:3001/personal-finances/',
      timeout: 5000,
    });
  }
});

const insert = (transaction) => {
  return apiClient.post('/', transaction);
};

const get = (id) => {
  return apiClient.get(`/${id || ''}`);
};

const update = (id) => {
  return apiClient.put(`/${id}`);
};

const remove = (id) => {
  return apiClient.delete(`/${id}`);
};

export {
  insert,
  get,
  update,
  remove,
}
