<template>
  <div class="search">
    <div class="search-box">
      <input type="text" placeholder="搜索歌曲、歌手、专辑" v-model="keywords" v-throttle="search" />
    </div>
    <div class="search-suggest" v-if="keywords">
      <scroll-view>
        <ul>
          <li v-for="song in songs" :key="song.id" @tap="toPlayer(song.id)">
            <p>{{song.name}} - {{song.artists[0].name}}</p>
          </li>
        </ul>
      </scroll-view>
    </div>
    <div class="search-hot">
      <h3>热门搜索</h3>
      <ul>
        <li v-for="hot in hots" :key="hot.first" @click="selectHot(hot.first)">{{hot.first}}</li>
      </ul>
    </div>
    <ul class="search-history">
      <li v-for="value in searchHistory" :key="value">
        <div class="history-left">
          <p>{{value}}</p>
        </div>
        <div class="history-right" @click="delSearchHistory(value)">X</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { getSearchList, getSearchHot } from "../../api/search";
import { setStorage, getStorage } from "../../common/base";

export default {
  name: "Search",
  data() {
    return {
      keywords: "",
      songs: [],
      hots: [],
      searchHistory: []
    };
  },
  mounted() {
    this.getSearchHot();
    this.getStorageSearchHistory();
  },
  methods: {
    ...mapActions(["setDefaultPlayer", "getSongDetail"]),
    toPlayer(id) {
      this.getSongDetail([id]);
      this.setDefaultPlayer(true);

      this.storageSearchHistory();
    },
    getStorageSearchHistory() {
      this.searchHistory = getStorage("searchHistory") || [];
    },
    storageSearchHistory() {
      if (this.searchHistory.includes(this.keywords)) {
        return;
      }

      this.searchHistory = [...this.searchHistory, this.keywords];
      setStorage("searchHistory", this.searchHistory);
      this.keywords = "";
    },
    async search() {
      if (this.keywords) {
        const rawData = await getSearchList({ keywords: this.keywords });
        if (rawData.code === 200) {
          this.songs = rawData.result.songs || [];
        }
      }
    },
    async getSearchHot() {
      const rawData = await getSearchHot();
      if (rawData.code === 200) {
        this.hots = rawData.result.hots;
      }
    },
    selectHot(keywords) {
      this.keywords = keywords;
      this.search();
    },
    delSearchHistory(name) {
      this.searchHistory = this.searchHistory.filter(
        item => item !== name
      );
      setStorage("searchHistory", this.searchHistory);
    }
  },
  directives: {
    throttle: {
      inserted(ele, obj) {
        let timer = null;
        ele.addEventListener("input", () => {
          timer && clearTimeout(timer);
          timer = setTimeout(() => obj.value(), 1000);
        });
      }
    }
  }
};
</script>

<style scoped lang='scss'>
@import "../../assets/css/mixin";
@import "../../assets/css/variable";

.search {
  position: fixed;
  left: 0;
  right: 0;
  top: 184px;
  bottom: 0;
  @include bg_sub_color();
  .search-box {
    display: flex;
    align-items: center;
    margin: 40px 20px;
    background: #ebecec;
    border-radius: 30px;
    border-bottom: 1px solid #ccc;
    input {
      border: 0;
      outline: none;
      background: transparent;
      @include font_size($font_medium);
      height: 60px;
      margin-left: 20px;
    }
  }
  .search-suggest {
    position: fixed;
    left: 0;
    right: 0;
    top: 300px;
    bottom: 0;
    overflow: hidden;
    @include bg_sub_color();
    li {
      padding: 20px;
      box-sizing: border-box;
      border-bottom: 1px solid #ccc;
      p {
        margin-left: 20px;
        @include font_color();
        @include font_size($font_medium);
      }
    }
  }
  .search-hot {
    h3 {
      @include font_color();
      @include font_size($font_medium);
      padding: 10px 20px;
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        height: 60px;
        line-height: 60px;
        border: 1px solid #000;
        border-radius: 30px;
        padding: 0 20px;
        @include font_color();
        @include font_size($font_medium_s);
        margin: 10px 20px;
      }
    }
  }
  .search-history {
    width: 100%;
    li {
      margin-top: 20px;
      width: 100%;
      display: flex;
      background: #ccc;
      padding: 20px 20px;
      box-sizing: border-box;
      justify-content: space-between;
    }
  }
}
</style>
