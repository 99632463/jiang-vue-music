<template>
  <div class="recommend">
    <scroll-view>
      <div>
        <Banner />
        <Personalized :personalizedList="gedanList" title="推荐歌单" type="playList" />
        <Personalized :personalizedList="newAlbumList" title="最新专辑" type="album" />
        <song-list :songs="songs" />
      </div>
    </scroll-view>
    <transition name="detail">
      <router-view />
    </transition>
  </div>
</template>

<script>
import Banner from "./banner";
import Personalized from "../../components/Personalized";
import { getPersonalized, getNewAblum, getNewSongs } from "../../api/recommend";

export default {
  name: "Recommend",
  data() {
    return {
      gedanList: [],
      newAlbumList: [],
      songs: []
    };
  },
  mounted() {
    this.getPersonalized();
    this.getNewAblum();
    this.getNewSongs();
  },
  methods: {
    async getPersonalized() {
      const rawData = await getPersonalized();
      if (rawData.code === 200) {
        this.gedanList = rawData.result;
      }
    },
    async getNewAblum() {
      const rawData = await getNewAblum();
      if (rawData.code === 200) {
        this.newAlbumList = rawData.albums.slice(0, 6);
      }
    },
    async getNewSongs() {
      const rawData = await getNewSongs();
      if (rawData.code === 200) {
        const newSongs = rawData.result.map((item, index) => {
          let singer = "";
          item.song.artists.forEach((ar, index) => {
            if (index === 0) {
              singer = ar.name;
            } else {
              singer += "-" + ar.name;
            }
          });

          return {
            id: item.id,
            name: item.name,
            singer,
            picUrl: item.song.album.picUrl,
          };
        });

        this.songs = newSongs || [];
      }
    }
  },
  components: {
    Banner,
    Personalized
  }
};
</script>

<style scoped lang='scss'>
.recommend {
  position: fixed;
  top: 184px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}
.detail-enter {
  transform: translateX(100%);
}
.detail-enter-to {
  transform: translateX(0);
}
.detail-enter-active {
  transition: transform 0.5s;
}
.detail-leave {
  transform: translateX(0);
}
.detail-leave-to {
  transform: translateX(100%);
}
.detail-leave-active {
  transition: transform 0.5s;
}
</style>
