<template>
  <div class="wrapper" ref="wrapper">
    <slot />
  </div>
</template>

<script>
import IScroll from "iscroll/build/iscroll-probe";

export default {
  name: "ScrollBar",
  mounted() {
    this.scroll = new IScroll(this.$refs.wrapper, {
      tap: true,
      scrollX: false,
      scrollY: true,
      disableMouse: true,
      disablePointer: true,
      disableTouch: false,
      probeType: 3
    });

    this.refreshScroll();
  },
  destroyed() {
    this.scroll.destroy();
    this.scroll = null;
    this.observer.disconnect();
  },
  methods: {
    refreshScroll() {
      this.observer = new MutationObserver(() => this.refresh());
      const config = {
        childList: true,
        subtree: true,
        attributeFilter: ["height", "offsetHeight"]
      };
      this.observer.disconnect();
      this.observer.observe(this.$refs.wrapper, config);
    },
    onScroll(fn) {
      this.scroll.on("scroll", function() {
        fn && fn(this.x, this.y);
      });
    },
    refresh() {
      setTimeout(() => this.scroll.refresh(), 100);
    },
    scrollTo(x, y, time) {
      this.scroll.scrollTo(x, y, time);
    }
  }
};
</script>

<style scoped lang='scss'>
.wrapper {
  width: 100%;
  height: 100%;
}
</style>