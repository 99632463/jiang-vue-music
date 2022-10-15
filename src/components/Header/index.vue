<template>
  <div class="header" @click="switchTheme">
    <div class="header-left"></div>
    <div class="header-title">知播渔音乐</div>
    <div class="header-right" @click="toAccount"></div>
  </div>
</template>

<script>
export default {
  name: "Header",
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
    },
    toAccount(){
      this.$router.push('/account');
    }
  }
};
</script>

<style scoped lang='scss'>
@import "../../assets/css/variable.scss";
@import "../../assets/css/mixin.scss";

.header {
  width: 100%;
  height: 100px;
  @include bg_color();
  display: flex;
  justify-content: space-between;
  .header-left,
  .header-right {
    width: 84px;
    height: 84px;
    margin-top: 8px;
  }
  .header-left {
    @include bg_img("../../assets/images/logo");
  }
  .header-right {
    @include bg_img("../../assets/images/account");
  }
  .header-title {
    text-align: center;
    line-height: 100px;
    color: #fff;
    font-weight: bold;
    @include font_size($font_medium);
  }
}
</style>
