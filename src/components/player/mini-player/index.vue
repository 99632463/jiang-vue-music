<template>
  <div class="mini-player">
    <div class="player-wrapper">
      <div class="player-left">
        <img
          :src="currentSongDetail.picUrl"
          @click="showDefaultPlayer"
        />
        <div class="player-title">
          <h3>{{currentSongDetail.name}}</h3>
          <p>{{currentSongDetail.singer}}</p>
        </div>
      </div>
      <div class="player-right">
        <div @click="setPlay" class="play" :class="{active: isPlaying}"></div>
        <div class="list" @click="showListPlayer"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Mini-Player",
  methods: {
    ...mapActions([
      "setDefaultPlayer", 
      "setMiniPlayer", 
      "setListPlayer", 
      "setIsPlaying"
    ]),
    showDefaultPlayer() {
      this.setDefaultPlayer(true);
      this.setMiniPlayer(false);
    },
    showListPlayer(){
      this.setListPlayer(true);
    },
    setPlay() {
      this.setIsPlaying(!this.isPlaying);
    }
  },
  computed: {
    ...mapGetters([
      "isPlaying",
      "currentSongDetail"
    ])
  }
};
</script>

<style scoped lang='scss'>
@import "../../../assets/css/variable";
@import "../../../assets/css/mixin";

.mini-player {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 150px;
  .player-wrapper {
    width: 100%;
    height: 100%;
    @include bg_color();
    display: flex;
    align-items: center;
    justify-content: space-between;
    .player-left {
      display: flex;
      padding-left: 30px;
      img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin-right: 20px;
      }
      .player-title {
        display: flex;
        flex-direction: column;
        justify-content: center;
        h3 {
          @include font_size($font_medium);
          @include font_color();
        }
        p {
          @include font_size($font_medium_s);
          @include font_color();
        }
      }
    }
    .player-right {
      display: flex;
      align-items: center;
      .play {
        width: 84px;
        height: 84px;
        @include bg_img("../../../assets/images/play");
        &.active {
          @include bg_img("../../../assets/images/pause");
        }
      }
      .list {
        width: 120px;
        height: 120px;
        @include bg_img("../../../assets/images/list");
      }
    }
  }
}
</style>