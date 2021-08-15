<template>
  <div v-if="predictions[0]" class="text-xl font-semibold">
    <transition name="slide-down" appear>
      <div class="block mb-6">
        Your flight from
        <b>{{ flight.originLocationCode }}</b> to
        <b>{{ flight.destinationLocationCode }}</b> has:
      </div>
    </transition>
    <transition-group name="slide-down" appear tag="ul" class="list-disc pl-5">
      <span v-for="pred in predictions" :key="pred.id" class="block py-2">
        <li>
          <b
            class="pt-5"
            :class="pred.probability <= 30 ? 'text-green-300' : ' text-red-300'"
            >{{ pred.probability }}% </b
          >of being delayed <b class="pt-5">{{ pred.result }}</b>
        </li>
      </span>
    </transition-group>
  </div>
  <div v-if="loading" class="w-full flex justify-center mt-10">
    <base-loading class="w-14" />
  </div>
  <div
    v-if="!predictions[0] && !close && error"
    class="
      flex
      space-x-2
      font-bold
      w-full
      h-auto
      rounded-2xl
      p-3
      bg-red-300 bg-opacity-60
      border-2 border-red-800
    "
  >
    <div class="inline-block self-center w-8 h-8">
      <ExclamationCircleIcon class="w-8 h-8" />
    </div>
    <div class="inline-block">
      {{ errorMessage }}
    </div>
    <span
      @click="() => (this.close = true)"
      class="inline-block w-6 h-6 cursor-pointer"
      ><XIcon class="w-6 h-6"
    /></span>
  </div>
</template>

<script>
import { ExclamationCircleIcon } from "@heroicons/vue/outline";
import { XIcon } from "@heroicons/vue/solid";
import BaseLoading from "./BaseLoading.vue";
export default {
  components: { ExclamationCircleIcon, XIcon, BaseLoading },
  props: ["flight", "predictions", "error", "loading"],
  data() {
    return {
      close: false,
    };
  },
  computed: {
    errorMessage: function () {
      switch (this.error) {
        case "flight":
          return "an error has occurred while searching for your flight, try again later ";

        case "prediction":
          return "an error has occurred while trying to get predictions for your flight, try again later pls";

        case "no flight":
          return "no flight found with specified data, please note that not all flights are supported yet";

        case "no prediction":
          return "no prediction found with specified flight, please note that not all flights are supported yet";

        default:
          return "An unexpected error has occured, sorry...";
      }
    },
  },
  watch: {
    error: function () {
      this.close = false;
    },
  },
};
</script>

<style>
.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-50px);
}

.slide-down-enter-active {
  transition: all 1s ease-out;
}
</style>
