<template>
  <swiper :options="swiperOptions" class="banner" v-if="banners.length">
    <swiper-slide v-for="banner in banners" :key="banner.bannerId" class="item">
      <a :href="banner.url || 'javascript:;'">
        <img :src="banner.pic" alt />
      </a>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import { getBanners } from "../../../api/recommend";

export default {
  name: "Banner",
  data() {
    return {
      banners: [],
      swiperOptions: {
        loop: true,
        autoplay: {
          delay: 1500,
          disableOnInteraction: false
        },
        pagination: {
          el: ".swiper-pagination"
        }
      }
    };
  },
  created() {
    this.getBanners();
  },
  methods: {
    async getBanners() {
      const rawData = await getBanners(2);
      if (rawData.code === 200) {
        this.banners = rawData.banners || [];
      }
    }
  },
  components: {
    Swiper,
    SwiperSlide
  }
};
</script>

<style scoped lang='scss'>
.banner {
  .item {
    img {
      width: 100%;
      height: 300px;
    }
  }
}
</style>
<style lang='scss'>
@import "../../../assets/css/mixin";

.banner {
  .swiper-pagination-bullet {
    width: 16px;
    height: 16px;
    background: #fff;
    opacity: 1;
  }
  .swiper-pagination-bullet-active {
    @include bg_color();
  }
}
</style>
