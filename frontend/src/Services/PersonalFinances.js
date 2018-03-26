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
  return new Promise((resolve, reject) => {
    apiClient.get(`/${id || ''}`).then((response) => {
      let data = response.data;
      if (Array.isArray(response.data)) {
        data = data.map(jsonToObject);
      } else {
        data = jsonToObject(data);
      }
      resolve(data);
    }).catch(reject);
  });
};

const update = (id, transaction) => {
  return apiClient.put(`/${id}`, transaction);
};

const remove = (id) => {
  return apiClient.delete(`/${id}`);
};

const jsonToObject = (json) => {
  const properties = Object.getOwnPropertyNames(json);
  const object = {};
  properties.forEach((property) => {
    let value = json[property];
    if (value.length >= 24) {
      value = new Date(value);
    }
    object[property] = isNaN(value) ? json[property] : value;
  });
  return object;
};

export {
  insert,
  get,
  update,
  remove,
}
