<template>
  <div id="app">
    <div v-if="!$route.meta.hideHeaderAndTabbar">
      <Header />
      <Tabbar />
    </div>
    <Player />
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import Header from "./components/Header";
import Tabbar from "./components/tabbar";
import Player from "./components/player";
import ListPlayer from "./components/player/list-player";
import MiniPlayer from "./components/player/mini-player";

export default {
  name: "App",
  data() {
    return {};
  },
  methods: {},
  components: {
    Header,
    Tabbar,
    Player,
    ListPlayer,
    MiniPlayer
  }
};
</script>

<style scoped lang="scss">
</style>
