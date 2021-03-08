<template>
  <div
    id="app"
    class="m-0 flex justify-center h-full max-h-full pt-24"
  >

    <TwoLists/>

  </div>
</template>

<script>
import TwoLists from '@/components/two-lists';

export default {
  name: 'App',
  components: {
    TwoLists,
  },
};
</script>

<style>

body{
  background-image: linear-gradient(to right bottom, rgb(207, 120, 43), rgb(181, 38, 38));
  height: 100vh;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

*,
*:before,
*:after {
  box-sizing: border-box;
}
</style>
