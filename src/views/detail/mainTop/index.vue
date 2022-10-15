<template>
  <div class="main-top">
    <div class="img-container">
      <img :src="path" alt />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "Main-top",
  props: {
    path: {
      type: String,
      default: "",
      required: true
    }
  },
  methods:{
    setMask(opacity){
      this.$refs.mask.style.opacity = opacity;
    }
  }
};
</script>

<style scoped lang='scss'>
.main-top{
  width: 100%;
  height: 500px;
  overflow: hidden;
  position: relative;
  img{
    width: 100%;
    height: 100%;
  }
  .mask{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0;
  }
}
</style>