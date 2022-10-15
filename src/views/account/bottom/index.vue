<template>
  <div class="account-bottom">
    <div class="bottom-play" @click="selectAll">
      <span></span>
      <span>播放全部</span>
    </div>
    <div class="bottom-wrapper">
      <scroll-view>
        <song-list :showTitle="false" :songs="switchType === 0 ? favoriteSongs : historySongs" />
      </scroll-view>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: "Account-Bottom",
  data() {
    return {
      switchType: 0
    };
  },
  created() {
    this.$eventBus.$on("switchNum", type => {
      this.switchType = type;
    });
  },
  methods:{
    ...mapActions([
      'setDefaultPlayer',
      'getSongDetail',
      'setCurrentIndex'
    ]),
    ...mapMutations([
      'SET_SONG_DETAIL'
    ]),
    selectAll(){
      this.setDefaultPlayer(true);
      this.setCurrentIndex(0);
      if(this.switchType === 0){
        this.SET_SONG_DETAIL(this.favoriteSongs);
      } else {
        this.SET_SONG_DETAIL(this.historySongs);
      }
    }
  },
  computed: {
    ...mapGetters([
      'favoriteSongs',
      'historySongs'
    ])
  }
};
</script>

<style scoped lang='scss'>
@import "../../../assets/css/mixin";

.account-bottom {
  position: fixed;
  top: 100px;
  bottom: 0;
  left: 0;
  right: 0;
  .bottom-play {
    width: 260px;
    height: 60px;
    margin: 20px auto;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #000;
    @include border_color();
    border-radius: 30px;
    span {
      display: inline-block;
      &:nth-of-type(1) {
        width: 46px;
        height: 46px;
        @include bg_img("../../../assets/images/small_play");
        margin-right: 20px;
      }
    }
  }
  .bottom-wrapper {
    position: fixed;
    top: 200px;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>