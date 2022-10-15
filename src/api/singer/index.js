import { request, requestAll } from '../network';

export const getHotArtists = (offset = 0, limit = 5) => {
  return new Promise((resolve, reject) => {
    request('/top/artists', { offset, limit })
    .then(result => resolve(result.artists))
    .catch(err => reject(err));
  })
}

export const getCategoryArtists = options => {
  const { offset = 0, limit = 5 , letter } = options;
  let temp = [];

  return new Promise((resolve, reject) => {
    requestAll([
      request('/artist/list', { offset, limit, cat: 1001, initial: letter }),
      request('/artist/list', { offset, limit, cat: 1002, initial: letter }),
      request('/artist/list', { offset, limit, cat: 1003, initial: letter }),
      request('/artist/list', { offset, limit, cat: 2001, initial: letter }),
      request('/artist/list', { offset, limit, cat: 2002, initial: letter }),
      request('/artist/list', { offset, limit, cat: 2003, initial: letter })
    ])
    .then(result => {
      result.forEach(item => {
        temp = [...temp, ...item.artists];
      })

      resolve(temp);
    })
    .catch(err => reject(err))
  })
}

export const getSingerDetail = id => {
  return request('/artists', { id });
}