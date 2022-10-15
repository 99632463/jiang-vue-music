<template>
  <div class="header" @click="switchTheme">
    <div class="header-left" @click.stop="hiddenNormalPlayer"></div>
    <div class="header-title">
      <h3>{{currentSongDetail.name}}</h3>
      <h3>{{currentSongDetail.singer}}</h3>
    </div>
    <div class="header-right"></div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Header",
  props: {
    name: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      themes: ["theme", "theme1", "theme2"],
      index: 0
    };
  },
  methods: {
    ...mapActions(["setDefaultPlayer", "setMiniPlayer"]),
    switchTheme() {
      this.index++;
      if (this.index >= this.themes.length) {
        this.index = 0;
      }
      document.documentElement.setAttribute(
        "data-theme",
        this.themes[this.index]
      );
    },
    hiddenNormalPlayer() {
      this.setDefaultPlayer(false);
      this.setMiniPlayer(true);
    }
  },
  computed: {
    ...mapGetters(["currentSongDetail"])
  }
};
</script>

<style scoped lang='scss'>
@import "@/assets/css/variable.scss";
@import "@/assets/css/mixin.scss";

.header {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  position: relative;
  z-index: 1000;
  .header-left,
  .header-right {
    width: 84px;
    height: 84px;
    margin-top: 8px;
  }
  .header-left {
    @include bg_img("../../../../assets/images/back");
  }
  .header-right {
    //@include bg_img("../../../../assets/images/more");
  }
  .header-title {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
    @include font_size($font_medium);
  }
}
</style>
