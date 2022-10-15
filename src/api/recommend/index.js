import { request } from '../network';

export const getBanners = type => {
  return request('/banner', { type });
}

export const getPersonalized = (limit = 6) => {
  return request('/personalized', { limit });
}

export const getNewAblum = () => {
  return request('/album/newest');
}

export const getNewSongs = () => {
  return request('/personalized/newsong');
}

export const getPlayList = id => {
  return request('/playlist/detail', { id });
}

export const getAlbum = id => {
  return request('/album', { id });
}

export const getSongDetail = ids => {
  return request('/song/detail', { ids });
}

export const getLyric = id => {
  return request('/lyric', { id });
}

export const getSongUrl = id => {
  return request('/song/url', { id });
}