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

.card {
  @apply bg-gray-900 rounded-2xl shadow-2xl mx-2 p-4;
}

.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-50px);
}

.slide-right-enter-from {
  opacity: 0;
  transform: translateX(-50px);
}
.slide-down-enter-active,
.slide-right-enter-active {
  transition: all 0.5s ease-out;
}

.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: all 0.3s ease 1s;
  
}
</style>
