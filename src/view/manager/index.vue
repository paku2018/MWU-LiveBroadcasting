<template>
  <div id="app">
    <top-nav/>
    <router-view/>
    <notifications group="foo" />
  </div>
</template>

<script>

import TopNav from "../TopNav";
export default {
  name: 'App',
  components: {
    TopNav
  }
}
</script>
