<template>
  <div class="bg-transparent border-0 p-0">
    <label class="block text-center font-medium">
      <slot />
    </label>
    <input
      :="$attrs"
      :value="modelValue"
      @change="this.$emit('update:modelValue', $event.target.value)"
      class="
        block
        mt-1
        w-full
        lg:w-40
        md:w-40
        rounded-2xl
        text-center
        bg-transparent
        border-purple-900
      "
    />
  </div>
</template>

<script>
export default {
  props: ["modelValue"],
};
</script>

<style></style>
