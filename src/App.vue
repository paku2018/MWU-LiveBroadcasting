<template>
  <div id="app">
    <router-view/>
    <notifications group="foo" />
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {

  }
}
</script>
