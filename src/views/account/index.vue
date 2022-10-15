<template>
  <div class="account">
    <Header />
    <Bottom />
  </div>
</template>

<script>
import Header from './header';
import Bottom from './bottom';

export default {
  name: 'Account',
  components:{
    Header,
    Bottom
  }
};
</script>

<style scoped lang='scss'>
</style>