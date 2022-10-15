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

export default {
  [SET_DEFAULT_PLAYER](state, show) {
    state.showDefaultPlayer = show;
    if (show) {
      state.showMiniPlayer = false;
      state.showListPlayer = false;
    }
  },
  [SET_LIST_PLAYER](state, show) {
    state.showListPlayer = show;
  },
  [SET_MINI_PLAYER](state, show) {
    state.showMiniPlayer = show;
  },
  [SET_IS_PLAYING](state, isPlaying) {
    state.isPlaying = isPlaying;
  },
  [SET_MODE_TYPE](state, type) {
    state.mode = type;
  },
  [SET_SONG_DETAIL](state, songs) {
    state.songs = songs;
  },
  [SET_LYRIC](state, lyrics) {
    state.lyrics = lyrics;
  },
  [SET_DEL_SONG](state, index) {
    if (index >= 0) {
      state.songs.splice(index, 1);
    } else {
      state.songs = [];
    }

    if (index < state.currentIndex) {
      state.currentIndex -= 1;
    }

    if (!state.songs.length) {
      state.showListPlayer = false;
      state.showMiniPlayer = false;
    }
  },
  [SET_CURRENT_INDEX](state, index) {
    if (index < 0) {
      index = state.songs.length - 1;
    } else if (index > state.songs.length - 1) {
      index = 0;
    }

    state.currentIndex = index;
  },
  [SET_AUDIO](state, audio) {
    state.audio = audio;
  },
  [SET_CUR_TIME](state, time) {
    state.curTime = time;
  },
  [SET_FAVORITE_SONGS](state, song) {
    const result = state.favoriteSongs.find(item => item.id === song.id);
    if (!result) {
      state.favoriteSongs = [...state.favoriteSongs, song];
    }
  },
  [SET_FAVORITE_LIST](state, list) {
    state.favoriteSongs = list;
  },
  [SET_HISTORY_SONGS](state, history) {
    const result = state.historySongs.find(item => item.id === history.id);
    if (!result) {
      state.historySongs = [...state.historySongs, history];
    }
  },
  [SET_HISTORY_LIST](state, history) {
    state.historySongs = history;
  },
}