export default {
  showDefaultPlayer(state) {
    return state.showDefaultPlayer;
  },
  showListPlayer(state) {
    return state.showListPlayer;
  },
  showMiniPlayer(state) {
    return state.showMiniPlayer;
  },
  isPlaying(state) {
    return state.isPlaying;
  },
  mode(state) {
    return state.mode;
  },
  songs(state) {
    return state.songs;
  },
  currentSongDetail(state) {
    return state.songs[state.currentIndex] || {};
  },
  currentIndex(state){
    return state.currentIndex;
  },
  lyrics(state) {
    return state.lyrics;
  },
  audio(state){
    return state.audio;
  },
  curTime(state){
    return state.curTime;
  },
  favoriteSongs(state){
    return state.favoriteSongs;
  },
  historySongs(state){
    return state.historySongs;
  },
}