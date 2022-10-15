<template>
  <div class="player-bottom">
    <div class="bottom-progress">
      <span>{{currentTime}}</span>
      <div class="progress-bar" @click="progressClick" ref="progressBar">
        <div class="progress-line" ref="progressLine">
          <div class="progress-dot"></div>
        </div>
      </div>
      <span>{{totalTime}}</span>
    </div>
    <div class="bottom-controll">
      <div class="mode loop" @click="changeModeType" ref="mode"></div>
      <div class="prev" @click="prev"></div>
      <div @click="setPlay" class="play" :class="{active: isPlaying}"></div>
      <div class="next" @click="next"></div>
      <div class="favorite" :class="{active: isFavorite}" @click="favoriteSong"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { modeType } from "@/common/enum";
import { formatTime, getRandomIndex, setStorage, getStorage } from "@/common/base";

export default {
  name: "Footer",
  data() {
    return {
      totalTime: "00:00",
      currentTime: "00:00",
      audioEle: null
    };
  },
  created() {
    const favoriteList = getStorage('favoriteList') || [];
    this.setFavoriteList(favoriteList);
  },
  methods: {
    ...mapActions([
      "setIsPlaying",
      "setModeType",
      "setCurrentIndex",
      "setCurTime",
      "setFavoriteSongs",
      "setFavoriteList",
      "setHistorySongs",
      "setHistoryList"
    ]),
    setPlay() {
      this.setIsPlaying(!this.isPlaying);
      if (this.isPlaying) {
        this.audioEle.addEventListener("timeupdate", () => {
          this.currentTime = formatTime(this.audioEle.currentTime);
          this.setCurTime(this.audioEle.currentTime);
          this.syncProgressBar(this.audioEle);
        });

        this.audioEle.addEventListener("ended", () => {
          if (this.mode === modeType.loop) {
            this.setCurrentIndex(this.currentIndex + 1);
          } else if (this.mode === modeType.one) {
            this.audioEle.play();
          } else {
            const randomIndex = getRandomIndex(0, this.songs.length - 1);
            this.setCurrentIndex(randomIndex);
          }
        });
      }
    },
    syncProgressBar(audio) {
      const value = (audio.currentTime / audio.duration) * 100;
      this.$refs.progressLine.style.width = value + "%";
    },
    setDuration(duration) {
      this.totalTime = formatTime(duration);
    },
    progressClick(e) {
      const normalLeft = e.target.offsetLeft;
      const eventLeft = e.pageX;
      const diff = eventLeft - normalLeft;
      const progressWidth = this.$refs.progressBar.offsetWidth;
      const scale = diff / progressWidth;
      this.$refs.progressLine.style.width = scale * 100 + "%";

      this.audio.currentTime = scale * this.audio.duration;
    },
    changeModeType() {
      const strategies = {
        [modeType.loop]: () => this.setModeType(modeType.one),
        [modeType.one]: () => this.setModeType(modeType.random),
        [modeType.random]: () => this.setModeType(modeType.loop)
      };

      const dispatch = strategies[this.mode];
      dispatch && dispatch();
    },
    prev() {
      this.setCurrentIndex(this.currentIndex - 1);
    },
    next() {
      this.setCurrentIndex(this.currentIndex + 1);
    },
    favoriteSong() {
      this.setFavoriteSongs(this.currentSongDetail);
    }
  },
  computed: {
    ...mapGetters([
      "isPlaying",
      "mode",
      "currentIndex",
      "audio",
      "songs",
      "currentSongDetail",
      "favoriteSongs"
    ]),
    isFavorite() {
      const isFavoriteCurrentSong = this.favoriteSongs.find(
        item => item.id === this.currentSongDetail.id
      );

      return isFavoriteCurrentSong;
    }
  },
  watch: {
    mode(newVal) {
      const mode = this.$refs.mode;
      if (mode) {
        const strategies = {
          [modeType.loop]: () => {
            mode.classList.remove("random");
            mode.classList.add("loop");
          },
          [modeType.one]: () => {
            mode.classList.remove("loop");
            mode.classList.add("one");
          },
          [modeType.random]: () => {
            mode.classList.remove("one");
            mode.classList.add("random");
          }
        };

        const dispatch = strategies[newVal];
        dispatch && dispatch();
      }
    },
    audio(newVal) {
      this.audioEle = newVal;
      this.setDuration(newVal.duration);
    },
    currentIndex(newVal) {
      this.audio.oncanplay = () => {
        this.setDuration(this.audio.duration);
      };
    },
    favoriteSongs(newVal){
      setStorage('favoriteList', newVal);
    }
  }
};
</script>

<style scoped lang='scss'>
@import "@/assets/css/variable";
@import "@/assets/css/mixin";

.player-bottom {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  .bottom-progress {
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .progress-bar {
      width: 100%;
      margin: 0 10px;
      height: 10px;
      background: white;
      .progress-line {
        width: 0%;
        height: 100%;
        background: #ccc;
        position: relative;
        .progress-dot {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #fff;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          margin-left: 100%;
        }
      }
    }
    span {
      @include font_size($font_samll);
      @include font_color();
    }
  }
  .bottom-controll {
    width: 80%;
    margin: 0 auto;
    padding: 50px 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    div {
      width: 84px;
      height: 84px;
    }
    .mode {
      &.loop {
        @include bg_img("../../../../assets/images/loop");
      }
      &.one {
        @include bg_img("../../../../assets/images/one");
      }
      &.random {
        @include bg_img("../../../../assets/images/shuffle");
      }
    }
    .prev {
      @include bg_img("../../../../assets/images/prev");
    }
    .play {
      @include bg_img("../../../../assets/images/play");
      &.active {
        @include bg_img("../../../../assets/images/pause");
      }
    }
    .next {
      @include bg_img("../../../../assets/images/next");
    }
    .favorite {
      @include bg_img("../../../../assets/images/un_favorite");
      &.active {
        @include bg_img("../../../../assets/images/favorite");
      }
    }
  }
}
</style>