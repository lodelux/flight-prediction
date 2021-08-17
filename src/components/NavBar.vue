<template>
  <div class="w-full h-16 flex justify-center gap-5 items-center">
    <router-link
      v-for="link in links"
      :key="link.name"
      :to="{ name: link.viewName }"
    >
      <button
        class="
          p-2
          rounded-lg
          hover:bg-gray-600 hover:bg-opacity-50
          text-lg
          font-sans
        "
        :class="link.name === selected ? 'font-semibold' : null"
      >
        {{ link.name }}
      </button>
    </router-link>
  </div>
</template>

<style></style>

<script>
export default {
  data() {
    return {
      links: [
        {
          name: "Home",
          viewName: "Home",
        },
        {
          name: "About",
          viewName: "Home",
        },
      ],
    };
  },
  computed: {
    selected() {
      return this.$route.name;
    },
  },
};
</script>
