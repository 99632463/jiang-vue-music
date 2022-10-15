<template>
  <div>
    <div class="cd-wrapper" :class="{active: isPlaying}">
      <img :src="currentSongDetail.picUrl" alt />
    </div>
    <p>{{getFirstLyric}}</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Cd",
  computed: {
    ...mapGetters(["isPlaying", "currentSongDetail", "lyrics"]),
    getFirstLyric() {
      for (let key in this.lyrics) {
        return this.lyrics[key].songName;
      }
    }
  }
};
</script>

<style scoped lang='scss'>
@import "@/assets/css/mixin";
@import "@/assets/css/variable";

.cd {
  .cd-wrapper {
    display: block;
    margin: 0 auto;
    width: 500px;
    height: 500px;
    border-radius: 50%;
    border: 30px solid #fff;
    overflow: hidden;
    animation: play 10s linear 0s infinite;
    animation-play-state: paused;
    &.active {
      animation-play-state: running;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
  p {
    text-align: center;
    @include font_size($font_medium);
    @include font_color();
    margin-top: 50px;
  }
}

@keyframes play {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>