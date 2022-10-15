import { modeType } from '../common/enum';

export default {
  showDefaultPlayer: false,
  showListPlayer: false,
  showMiniPlayer: false,
  isPlaying: false,
  mode: modeType.loop,
  songs: [],
  currentIndex: 0,
  lyrics: [],
  audio: null,
  curTime: 0,
  favoriteSongs: [],
  historySongs: []
}