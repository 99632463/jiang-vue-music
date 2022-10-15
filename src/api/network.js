import axios from 'axios';
import Vue from 'vue';

axios.defaults.baseURL = 'http://music.it666.com:3666';
axios.defaults.timeout = 5000;

let count = 0;

axios.interceptors.request.use(function (config) {
  count++;
  Vue.showLoading();
  return config;
}, function (error) {
  Vue.hiddenLoading();
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  count--;
  if (count === 0) {
    Vue.hiddenLoading();
  }
  return response;
}, function (error) {
  Vue.hiddenLoading();
  return Promise.reject(error);
});

export const request = (url = '', params = {}, type = 'get') => {
  return new Promise((resolve, reject) => {
    let promise;
    type === 'get' ?
      promise = axios.get(url, { params })
      :
      promise = axios.post(url, params);

    promise
      .then(result => resolve(result.data))
      .catch(err => reject(err));
  });
}

export const requestAll = list => {
  return new Promise((resolve, reject) => {
    axios.all(list)
      .then(axios.spread((...result) => {
        resolve(result);
      }))
      .catch(err => reject(err))
  });
}