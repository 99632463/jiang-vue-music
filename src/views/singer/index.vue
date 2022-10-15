<template>
  <div class="singer">
    <scroll-view ref="scrollView">
      <ul class="list-wrapper">
        <li class="list-group" ref="listGroup" v-for="(value,index) in list" :key="index">
          <h2 class="group-title">{{keys[index]}}</h2>
          <ul>
            <li 
              class="group-item" 
              v-for="obj in list[index]"
              :key="obj.id"
              @tap='toDetail(obj.id)'
            >
              <img v-lazy="obj.img1v1Url" alt />
              <p>{{obj.name}}</p>
            </li>
          </ul>
        </li>
      </ul>
    </scroll-view>
    <ul class="list-keys">
      <li
        v-for="(key, index) in keys"
        :key="key"
        :data-index='index'
        :class="{active: currentIndex === index}"
        @click="clickKey(index)"
        @touchstart='touchstart'
        @touchmove='touchmove'
       
      >{{key}}</li>
    </ul>
    <div class="fix-title" v-if="fixTitle">{{fixTitle}}</div>
    <transition>
      <router-view />
    </transition>
  </div>
</template>

<script>
import { getHotArtists,  getCategoryArtists } from "../../api/singer";

export default {
  name: "Singer",
  data() {
    return {
      keys: [],
      list: [],
      totalTop: [],
      currentIndex: 0,
      startOffsetY: 0,
      moveOffsetY: 0,
      scrollY: 0
    };
  },
  mounted() {
    this.getCategoryArtists();
    this.onScroll();
  },
  methods: {
    async getCategoryArtists() {
      let keys = ["热"];
      let list = [getHotArtists()];

      for (let i = 65; i < 91; i++) {
        const letter = String.fromCharCode(i);
        keys = [...keys, letter];
        const rawData = getCategoryArtists({ letter });
        list = [...list, rawData];
      }

      this.keys = keys;
      this.list = await Promise.all(list);
    },
    clickKey(index) {
      this.currentIndex = index;
      this.$refs.scrollView.scrollTo(0, -this.totalTop[index]);
    },
    touchstart(e) {
      const index = e.target.dataset.index;
      this.clickKey(index);

      this.startOffsetY = e.targetTouches[0].pageY;
    },
    touchmove(e) {
      this.moveOffsetY = e.targetTouches[0].pageY;
      const height = e.target.offsetHeight;
      const diff = (this.moveOffsetY - this.startOffsetY) / height;
      const index = Math.floor(diff) + Number(e.target.dataset.index);

      this.clickKey(index);
    },
    onScroll() {
      this.$refs.scrollView.onScroll((x, y) => {
        this.scrollY = y;
        if (y >= 0) {
          this.currentIndex = 0;
          return;
        }

        for(let i = 0; i < this.totalTop.length; i++){
          const prev = this.totalTop[i];
          const next = this.totalTop[i + 1];
          if (-y >= prev && -y <= next) {
            this.currentIndex = i;
            return;
          }
        }

        this.currentIndex = this.totalTop.length - 1;
      });
    },
    toDetail(id){
      this.$router.push(`/singer/detail/${id}/singer`);
    }
  },
  computed:{
    fixTitle(){
      if(this.scrollY >= 0){
        return '';
      }
      return this.keys[this.currentIndex];
    }
  },
  watch: {
    list() {
      this.$nextTick(() => {
        const item = this.$refs.listGroup;
        item.forEach(value => {
          this.totalTop.push(value.offsetTop);
        });
      });
    }
  }
};
</script>

<style scoped lang='scss'>
@import "../../assets/css/variable";
@import "../../assets/css/mixin";

.singer {
  position: fixed;
  top: 184px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  @include bg_sub_color();
  .list-wrapper {
    .group-title {
      @include bg_color();
      @include font_size($font_medium);
      color: #fff;
      padding: 10px 20px;
      box-sizing: border-box;
    }
    .group-item {
      display: flex;
      justify-content: flex-start;
      padding: 10px 20px;
      border-bottom: 1px solid #ccc;
      img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        overflow: hidden;
      }
      p {
        @include font_size($font_medium);
        @include font_color();
        display: flex;
        align-items: center;
        margin-left: 20px;
      }
    }
  }
  .list-keys {
    position: fixed;
    right: 10px;
    top: 60%;
    transform: translateY(-50%);
    li {
      @include font_color();
      @include font_size($font_medium_s);
      padding: 1px 0;
      &.active {
        text-shadow: 0 0 10px #000;
      }
    }
  }
  .fix-title{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    z-index: 999;
    padding: 10px 20px;
    box-sizing: border-box;
    @include font_size($font_medium);
    color: white;
    @include bg_color();
  }
}
.v-enter {
  transform: translateX(100%);
}
.v-enter-to {
  transform: translateX(0);
}
.v-enter-active {
  transition: transform 0.5s;
}
.v-leave {
  transform: translateX(0);
}
.v-leave-to {
  transform: translateX(100%);
}
.v-leave-active {
  transition: transform 0.5s;
}
</style>
