<template>
  <div class="detail">
    <Header :name="playList.name" />
    <main-top :path="playList.coverImgUrl" ref="mainTop" />
    <div class="bottom">
      <scroll-view ref="scrollView">
        <MainBottom :playList="playList.tracks" />
      </scroll-view>
    </div>
  </div>
</template>

<script>
import Header from "./header";
import MainTop from "./mainTop";
import MainBottom from "./mainBottom";
import { getPlayList, getAlbum } from "../../api/recommend";
import { getSingerDetail } from "../../api/singer";

export default {
  name: "Detail",
  data() {
    return {
      playList: {}
    };
  },
  created() {
    const { id, type } = this.$route.params;
    this.id = id;
    this.type = type;
  },
  mounted() {
    if (this.type === "playList") {
      this.getPlayList();
    } else if(this.type === "album") {
      this.getAlbum();
    } else if(this.type === "singer") {
      this.getSingerDetail();
    }

    this.observeScroll();
  },
  methods: {
    async getPlayList() {
      const rawData = await getPlayList(this.id);
      if (rawData.code === 200) {
        this.playList = rawData.playlist || [];
      }
    },
    async getAlbum() {
      const rawData = await getAlbum(this.id);
      if (rawData.code === 200) {
        this.playList = {
          name: rawData.album.name,
          coverImgUrl: rawData.album.picUrl,
          tracks: rawData.songs
        };
      }
    },
    async getSingerDetail() {
      const rawData = await getSingerDetail(this.id);
      if (rawData.code === 200) {
        this.playList = {
          name: rawData.artist.name,
          coverImgUrl: rawData.artist.picUrl,
          tracks: rawData.hotSongs
        };
      }
    },
    observeScroll() {
      this.$refs.scrollView.onScroll((x, y) => {
        this.scaleImg(y);
      });
    },
    scaleImg(scrollY) {
      const mainTop = this.$refs.mainTop.$el;
      const defaultHeight = mainTop.offsetHeight;

      if (scrollY > 0) {
        const scale = 1 + scrollY / defaultHeight;
        mainTop.style.transform = `scale(${scale})`;
      } else {
        const scale = Math.abs(scrollY) / defaultHeight;
        this.$refs.mainTop.setMask(scale);
      }
    }
  },
  components: {
    Header,
    MainTop,
    MainBottom
  }
};
</script>

<style scoped lang='scss'>
@import "../../assets/css/mixin";

.detail {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  @include bg_sub_color();
  .bottom {
    width: 100%;
    position: fixed;
    top: 500px;
    bottom: 0;
  }
}
</style>