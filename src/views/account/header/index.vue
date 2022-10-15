<template>
  <div class="header" @click="switchTheme">
    <div class="header-left" @click.stop="$router.back()"></div>
    <ul class="header-title">
      <li :class="{active: switchType === 0}" @click.stop="switchNum(0)">我最喜欢的</li>
      <li :class="{active: switchType === 1}" @click.stop="switchNum(1)">最近听过的</li>
    </ul>
    <div class="header-right"></div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      themes: ["theme", "theme1", "theme2"],
      index: 0,
      switchType: 0
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
    },
    switchNum(type){
      this.$eventBus.$emit('switchNum', type)
      this.switchType = type;
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
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #fff;
    border-radius: 10px;
    color: #fff;
    font-weight: bold;
    @include font_size($font_medium);
    @include no-wrap();
    height: 60px;
    margin-top: 20px;
    li {
      height: 60px;
      line-height: 60px;
      padding: 0 20px;
      &:nth-of-type(1) {
        border-right: 1px solid #fff;
      }
      &.active{
        background: rgba(255,255,255,.5);
      }
    }
  }
}
</style>
