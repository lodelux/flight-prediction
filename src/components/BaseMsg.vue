<template>
  <div
    class="flex space-x-2 font-bold w-full h-auto rounded-2xl p-3"
    :class="typeClass"
  >
    <div class="inline-block self-center w-8 h-8">
      <ExclamationCircleIcon class="w-8 h-8" />
    </div>
    <div class="inline-block">
      {{ message }}
    </div>
    <span
      @click="this.$emit('close')"
      class="inline-block w-6 h-6 cursor-pointer"
      ><XIcon class="w-6 h-6"
    /></span>
  </div>
</template>

<script>
import { ExclamationCircleIcon } from "@heroicons/vue/outline";
import { XIcon } from "@heroicons/vue/solid";

export default {
  components: { ExclamationCircleIcon, XIcon },
  props: {
    type: {
      type: String,
      default: "error",
    },
    message: {
      type: String,
      default: "",
    },
  },
  computed: {
    typeClass: function () {
      switch (this.type) {
        case "error":
          return "bg-red-300 bg-opacity-60 border-2 border-red-800";

        case "success":
          return "bg-green-300 bg-opacity-60 border-2 border-green-800";

        default:
          return "bg-red-300 bg-opacity-60 border-2 border-red-800";
      }
    },
  },
};
</script>

<style></style>
