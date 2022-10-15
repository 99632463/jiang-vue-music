<template>
  <swiper :options="swiperOptions" class="banner">
    <swiper-slide class="cd">
      <Cd />
    </swiper-slide>
    <swiper-slide class="lyric" ref="lyricRef">
      <Lyric :lyricRef='lyricRef' />
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import Cd from "./cd";
import Lyric from "./lyric";

export default {
  name: "Player-Middle",
  data() {
    return {
      lyricRef: null,
      swiperOptions: {
        pagination: {
          el: ".swiper-pagination",
          bulletClass: "my-bullet",
          bulletActiveClass: "my-bullet-active"
        },
        observer: true,
        observeParents: true,
        observeSlideChildren: true
      }
    };
  },
  mounted(){
    this.lyricRef = this.$refs.lyricRef.$el;
  },
  components: {
    Swiper,
    SwiperSlide,
    Cd,
    Lyric
  }
};
</script>

<style scoped lang='scss'>
.banner {
  position: fixed;
  top: 150px;
  bottom: 250px;
  left: 0;
  right: 0;
}
</style>
<style lang="scss">
@import "@/assets/css/mixin";

.my-bullet {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background: #fff;
  margin: 0 20px;
}
.my-bullet-active {
  width: 60px;
  @include bg_color();
}
</style>