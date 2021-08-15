<template>
  <NavBar />
  <router-view />
</template>

<script>
import NavBar from "@/components/NavBar.vue";
export default {
  components: { NavBar },
};
</script>
<style lang="scss">
#app {
  @apply font-sans;
  @apply w-screen min-h-screen bg-gradient-to-tl from-blue-900 to-purple-900;
  @apply text-indigo-200;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
