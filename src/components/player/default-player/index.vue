<template>
  <div v-show="showDefaultPlayer">
    <div class="player-bg">
      <img :src="currentSongDetail.picUrl" alt />
    </div>
    <Header />
    <Middle />
    <Footer />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Header from "./header";
import Middle from "./middle";
import Footer from "./footer";

export default {
  name: "Default-Player",
  computed: {
    ...mapGetters(["showDefaultPlayer", "currentSongDetail"])
  },
  methods: {
    ...mapActions([
      "getLyrics"
    ])
  },
  watch: {
    currentSongDetail(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.getLyrics(newVal.id);
      }
    }
  },
  components: {
    Header,
    Middle,
    Footer
  }
};
</script>

<style scoped lang='scss'>
.player-bg {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  img {
    height: 100%;
    filter: blur(10px);
  }
}
</style>