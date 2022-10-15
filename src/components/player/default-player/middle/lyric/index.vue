<template>
  <scroll-view ref="scrollView">
    <ul>
      <li
        v-for="(lyric,index) in lyrics"
        :key="index"
        :class="{active:currentTime === lyric.time.toString()}"
      >{{lyric.songName}}</li>
    </ul>
  </scroll-view>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Lyric",
  props: {
    lyricRef: null
  },
  data() {
    return {
      currentTime: "0"
    };
  },
  methods: {
    syncLyricHighlight(curTime) {
      const time = Math.floor(curTime) + "";
      for (var i = 0; i < this.lyrics.length; i++) {
        if (this.lyrics[i].time == time) {
          this.currentTime = time;
          this.scrollLyric();
        }
      }
    },
    scrollLyric() {
      const lyricHeight = this.lyricRef.offsetHeight;
      const active = document.querySelector("li.active");
      const activeOffsetTop = active && active.offsetTop;
      if (activeOffsetTop > lyricHeight / 2) {
        this.$refs.scrollView.scrollTo(
          0,
          lyricHeight / 2 - activeOffsetTop,
          100
        );
      }
    }
  },
  watch: {
    curTime(newVal) {
      this.syncLyricHighlight(newVal);
    },
    lyrics(newVal) {
      for (let i = 0; i < newVal.length; i++) {
        this.currentTime = newVal[i].time.toString();
        return;
      }
    }
  },
  computed: {
    ...mapGetters(["lyrics", "curTime"])
  }
};
</script>

<style scoped lang='scss'>
@import "@/assets/css/mixin";
@import "@/assets/css/variable";

.lyric {
  li {
    text-align: center;
    @include font_size($font_medium);
    @include font_color();
    margin: 10px 0;
    &.active {
      color: #fff;
    }
    &:last-of-type {
      padding-bottom: 50%;
    }
  }
}
</style>