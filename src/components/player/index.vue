<template>
  <div class="player">
    <DefaultPlayer />
    <div v-if="showMiniPlayer">
      <ListPlayer />
      <MiniPlayer />
    </div>
    <audio :src="currentSongDetail.songUrl" ref="audio"></audio>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import DefaultPlayer from "./default-player";
import MiniPlayer from "./mini-player";
import ListPlayer from "./list-player";
import { setStorage, getStorage } from "@/common/base";

export default {
  name: "Player",
  created() {
    const historyList = getStorage('historyList') || [];
    this.setHistoryList(historyList);
  },
  mounted() {
    this.$refs.audio.oncanplay = () => {
      this.setAudio(this.$refs.audio);
    }
  },
  methods: {
    ...mapActions([
      'setAudio',
      "setHistorySongs",
      "setHistoryList"
    ])
  },
  computed: {
    ...mapGetters([
      "showMiniPlayer",
      "currentSongDetail",
      "isPlaying",
      "currentIndex",
      "historySongs",
    ])
  },
  watch: {
    isPlaying(newVal) {
      if (newVal) {
        this.setHistorySongs(this.currentSongDetail);
        this.$refs.audio.play();
      } else {
        this.$refs.audio.pause();
      }
    },
    currentIndex(newVal, oldVal) {
      if (newVal !== oldVal) {
        const audio = this.$refs.audio;
        setTimeout(() => {
          if (this.isPlaying) {
            this.setHistorySongs(this.currentSongDetail);
            audio.play();
          } else {
            audio.pause();
          }
        },100)
      }
    },
    historySongs(newVal){
      setStorage('historyList', newVal);
    }
  },
  components: {
    DefaultPlayer,
    MiniPlayer,
    ListPlayer
  }
};
</script>

<style scoped lang='scss'>
.player {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1002;
  width: 100%;
}
</style>