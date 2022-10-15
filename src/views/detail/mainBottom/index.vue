<template>
  <ul class="main-bottom">
    <li class="bottom-top" @tap="playAll">
      <div class="bottom-icon"></div>
      <div class="bottom-title">播放全部</div>
    </li>
    <li v-for="item in playList" :key="item.id" class="item" @tap="toPlayer(item.id)">
      <h3>{{item.name}}</h3>
      <p>{{item.al && item.al.name}} - {{item.ar[0] && item.ar[0].name}}</p>
    </li>
  </ul>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "main-bottom",
  props: {
    playList: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  methods: {
    ...mapActions(["setDefaultPlayer", "getSongDetail", "getLyrics"]),
    toPlayer(id) {
      this.getSongDetail([id]);
      this.setDefaultPlayer(true);
    },
    playAll() {
      const allId = this.playList.map(play => play.id);
      this.getSongDetail(allId);
      this.setDefaultPlayer(true);
    }
  }
};
</script>

<style scoped lang='scss'>
@import "../../../assets/css/variable.scss";
@import "../../../assets/css/mixin.scss";

.main-bottom {
  li {
    width: 100%;
    height: 100px;
    padding: 20px;
    box-sizing: border-box;
    @include bg_sub_color();
    border-bottom: 1px solid #ccc;
  }
  .bottom-top {
    display: flex;
    align-items: center;
    border-top-left-radius: 50px;
    border-top-right-radius: 50px;
    .bottom-icon {
      width: 60px;
      height: 60px;
      @include bg_img("../../../assets/images/small_play");
      margin-right: 20px;
    }
    .bottom-title {
      @include font_color();
      @include font_size($font_large);
    }
  }
  .item {
    h3 {
      @include font_color();
      @include font_size($font_medium);
    }
    p {
      @include font_color();
      @include font_size($font_samll);
      margin-top: 10px;
      opacity: 0.8;
    }
  }
}
</style>