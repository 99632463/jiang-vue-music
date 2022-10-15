import { request } from '../network';

export const getSearchList = options => {
  return request('/search?type=1', options);
}

export const getSearchHot = () => {
  return request('/search/hot');
}