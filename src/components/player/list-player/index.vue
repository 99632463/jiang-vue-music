<template>
  <div class="list-player" v-show="showListPlayer">
    <div class="player-wrapper">
      <div class="player-top">
        <div class="top-left">
          <div class="mode loop" @click="changeModeType" ref="mode"></div>
          <p>顺序播放</p>
        </div>
        <div class="top-right">
          <div class="del" @click="delAll"></div>
        </div>
      </div>
      <div class="player-middle">
        <scroll-view ref="scrollView">
          <ul>
            <li 
              class="item" 
              v-for="(song,index) in songs"
              :key="song.id"
              @tap='selectItem(index)'
            >
              <div class="item-left">
                <div
                  @tap.stop="setPlay" 
                  class="item-play" 
                  :class="{active: isPlaying}"
                  v-if="currentIndex === index"
                />
                <p>{{song.name}}</p>
              </div>
              <div class="item-right">
                <div 
                  class="item-favorite" 
                  :class="{active: isFavorite(song)}" 
                  @tap.stop='favoriteSong(song)'
                />
                <div class="item-del" @tap.stop="del(index)"></div>
              </div>
            </li>
          </ul>
        </scroll-view>
      </div>
      <div class="player-bottom">
        <p @click="closeListPlayer">关闭</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { modeType } from "@/common/enum";

export default {
  name: "List-Player",
  data() {
    return {};
  },
  created() {
    const list = JSON.parse(localStorage.getItem('favoriteList')) || [];
    this.setFavoriteList(list);
  },
  mounted() {},
  methods: {
    ...mapActions([
      "setListPlayer",
      "setIsPlaying",
      "setModeType",
      "delSong",
      "setCurrentIndex",
      "setFavoriteSongs",
      "setFavoriteList"
    ]),
    closeListPlayer() {
      this.setListPlayer(false);
    },
    setPlay() {
      this.setIsPlaying(!this.isPlaying);
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
    del(index) {
      this.delSong(index);
    },
    delAll() {
      this.delSong();
    },
    selectItem(index){
      this.setCurrentIndex(index);
    },
    favoriteSong(song){
      this.setFavoriteSongs(song);
    },
    isFavorite(song) {
      const isFavoriteCurrentSong = this.favoriteSongs.find(
        item => item.id === song.id
      );

      return isFavoriteCurrentSong;
    }
  },
  computed: {
    ...mapGetters([
      "isPlaying",
      "showListPlayer",
      "showMiniPlayer",
      "mode",
      "songs",
      "currentIndex",
      "favoriteSongs"
    ])
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
    showListPlayer(newVal, oldVal) {
      if (newVal && newVal !== oldVal) {
        this.$refs.scrollView.refresh();
      }
    },
    favoriteSongs(newVal){
      localStorage.setItem('favoriteList', JSON.stringify(newVal));
    }
  }
};
</script>

<style scoped lang='scss'>
@import "../../../assets/css/variable";
@import "../../../assets/css/mixin";

.list-player {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 999;
  @include bg_sub_color();
  .player-wrapper {
    .player-top {
      width: 100%;
      height: 100px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .top-left {
        display: flex;
        align-items: center;
        padding-left: 20px;
        .mode {
          width: 56px;
          height: 56px;
          margin-right: 20px;
          &.loop {
            @include bg_img("../../../assets/images/small_loop");
          }
          &.one {
            @include bg_img("../../../assets/images/small_one");
          }
          &.random {
            @include bg_img("../../../assets/images/small_shuffle");
          }
        }
        p {
          @include font_size($font_medium_s);
          @include font_color();
        }
      }
      .top-right {
        .del {
          width: 84px;
          height: 84px;
          @include bg_img("../../../assets/images/small_del");
        }
      }
    }
    .player-middle {
      height: 700px;
      overflow: hidden;
      .item {
        border-top: 1px solid #ccc;
        height: 100px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        box-sizing: border-box;
        .item-left {
          display: flex;
          align-items: center;
          .item-play {
            width: 56px;
            height: 56px;
            margin-right: 20px;
            @include bg_img("../../../assets/images/small_play");
            &.active {
              @include bg_img("../../../assets/images/small_pause");
            }
          }
          p {
            @include font_size($font_medium_s);
            @include font_color();
          }
        }
        .item-right {
          display: flex;
          align-items: center;
          .item-favorite {
            width: 56px;
            height: 56px;
            @include bg_img("../../../assets/images/small_un_favorite");
            &.active{
              @include bg_img("../../../assets/images/small_favorite");
            }
          }
          .item-del {
            width: 52px;
            height: 52px;
            margin-left: 20px;
            @include bg_img("../../../assets/images/small_close");
          }
        }
      }
    }
    .player-bottom {
      width: 100%;
      height: 100px;
      line-height: 100px;
      @include bg_color();
      p {
        text-align: center;
        @include font_size($font_medium);
        color: #fff;
      }
    }
  }
}
</style>