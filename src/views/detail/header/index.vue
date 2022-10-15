<template>
  <div class="header" @click="switchTheme">
    <div class="header-left" @click.stop='$router.back()'></div>
    <div class="header-title">{{name}}</div>
    <div class="header-right"></div>
  </div>
</template>

<script>
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
    switchTheme() {
      this.index++;
      if (this.index >= this.themes.length) {
        this.index = 0;
      }
      document.documentElement.setAttribute(
        "data-theme",
        this.themes[this.index]
      );
    }
  }
};
</script>

<style scoped lang='scss'>
@import "../../../assets/css/variable.scss";
@import "../../../assets/css/mixin.scss";

.header {
  width: 100%;
  height: 100px;
  @include bg_color();
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
    @include bg_img("../../../assets/images/back");
  }
  .header-right {
    @include bg_img("../../../assets/images/more");
  }
  .header-title {
    text-align: center;
    line-height: 100px;
    color: #fff;
    font-weight: bold;
    @include font_size($font_medium);
    @include no-wrap();
  }
}
</style>
