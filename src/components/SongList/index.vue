<template>
  <div class="song">
    <div class="song-top" v-if='showTitle'>
      <h3>最新音乐</h3>
    </div>
    <ul class="song-list">
      <li v-for="song in songs" :key="song.id" class="item" @tap='toPlayer(song.id)'>
        <img v-lazy="song.picUrl" alt />
        <div>
          <h3>{{song.name}}</h3>
          <p>{{song.singer}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "SongList",
  props: {
    songs: {
      type: Array,
      default: [],
      required: true
    },
    showTitle: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions([
      "setDefaultPlayer",
      "getSongDetail",
      "getLyrics"
    ]),
    toPlayer(id){
      this.getSongDetail([id]);
      this.getLyrics(id);
      this.setDefaultPlayer(true);
    }
  }
};
</script>

<style scoped lang='scss'>
@import "../../assets/css/mixin";
@import "../../assets/css/variable";

.song {
  width: 100%;
  @include bg_sub_color();
  .song-top {
    width: 100%;
    height: 84px;
    line-height: 84px;
    border-bottom: 1px solid #ccc;
    margin-left: 30px;
    @include bg_sub_color();
    h3 {
      @include font_size($font_large);
      font-weight: bold;
      @include font_color();
    }
  }
  .song-list {
    width: 100%;
    .item {
      width: 100%;
      height: 200px;
      display: flex;
      align-items: center;
      padding: 0 20px;
      margin-bottom: 20px;
      border-bottom: 1px solid #ccc;
      img {
        width: 150px;
        height: 150px;
        border-radius: 20px;
        margin-right: 20px;
      }
      div{
        h3{
          @include font_size($font_large);
          @include font_color();
        }
        p{
          @include font_size($font_samll);
          @include font_color();
          opacity: 0.6;
          margin-top: 20px;
        }
      }
    }
  }
}
</style>
