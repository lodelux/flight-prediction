<template>
  <div class="bg-transparent border-0 p-0">
    <label class="block text-center ">
      <slot />
    </label>
    <input
      :="$attrs"
      class="block mt-1 w-full lg:w-40 rounded-2xl text-center bg-transparent border-purple-900 "
    />
  </div>
</template>

<script>
export default {};
</script>

<style></style>
