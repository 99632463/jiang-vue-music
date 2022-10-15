import {
  SET_DEFAULT_PLAYER,
  SET_MINI_PLAYER,
  SET_LIST_PLAYER,
  SET_IS_PLAYING,
  SET_MODE_TYPE,
  SET_SONG_DETAIL,
  SET_LYRIC,
  SET_DEL_SONG,
  SET_CURRENT_INDEX,
  SET_AUDIO,
  SET_CUR_TIME,
  SET_FAVORITE_SONGS,
  SET_FAVORITE_LIST,
  SET_HISTORY_SONGS,
  SET_HISTORY_LIST,
} from './mutations-type';
import { getSongDetail, getSongUrl, getLyric } from '../api/recommend';
import { parsingLyric } from '../common/base';

export default {
  setDefaultPlayer({ commit }, show) {
    commit(SET_DEFAULT_PLAYER, show);
  },
  setListPlayer({ commit }, show) {
    commit(SET_LIST_PLAYER, show);
  },
  setMiniPlayer({ commit }, show) {
    commit(SET_MINI_PLAYER, show);
  },
  setIsPlaying({ commit }, isPlaying) {
    commit(SET_IS_PLAYING, isPlaying);
  },
  setModeType({ commit }, type) {
    commit(SET_MODE_TYPE, type);
  },
  async getSongDetail({ commit }, ids) {
    const rawData = await Promise.all([
      getSongDetail(ids.join(',')),
      getSongUrl(ids.join(','))
    ]);
    if (rawData[0].code === 200) {
      const newSongs = rawData[0].songs.map((item, index) => {
        let singer = "";
        item.ar.forEach((ar, index) => {
          if (index === 0) {
            singer = ar.name;
          } else {
            singer += "-" + ar.name;
          }
        });

        let songUrl = '';
        rawData[1].data.forEach(value => {
          if(item.id === value.id){
            songUrl = value.url;
          }
        })

        return {
          id: item.id,
          name: item.name,
          singer,
          picUrl: item.al.picUrl,
          songUrl
        };
      });

      commit(SET_SONG_DETAIL, newSongs);
    }
  },
  async getLyrics({ commit }, id) {
    const rawData = await getLyric(id);
    if (rawData.code === 200) {
      const lyrics = parsingLyric(rawData.lrc.lyric);
      commit(SET_LYRIC, lyrics);
    }
  },
  delSong({ commit }, index) {
    commit(SET_DEL_SONG, index);
  },
  setCurrentIndex({ commit }, index) {
    commit(SET_CURRENT_INDEX, index);
  },
  setAudio({ commit }, audio) {
    commit(SET_AUDIO, audio);
  },
  setCurTime({ commit }, time) {
    commit(SET_CUR_TIME, time);
  },
  setFavoriteSongs({ commit }, song) {
    commit(SET_FAVORITE_SONGS, song);
  },
  setFavoriteList({ commit }, list) {
    commit(SET_FAVORITE_LIST, list);
  },
  setHistorySongs({ commit }, history) {
    commit(SET_HISTORY_SONGS, history);
  },
  setHistoryList({ commit }, history) {
    commit(SET_HISTORY_LIST, history);
  },
}