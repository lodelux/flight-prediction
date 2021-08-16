<template>
  <div class=" text-xl font-semibold">
    <transition name="slide-down" appear>
      <div class="block mb-6 text-center">
        Your flight from
        <b>{{ flight.originLocationCode }}</b> to
        <b>{{ flight.destinationLocationCode }}</b> has:
      </div>
    </transition>
    <transition-group
      name="slide-right"
      appear
      tag="div"
      class="flex flex-col space-y-3 mb-8 text-lg"
    >
      <div
        v-for="pred in predictions"
        :key="pred.id"
        class="flex space-x-2 py-2 card"
      >
        <span class="w-8 h-8 self-center inline-block flex-shrink-0"
          ><component
            class="w-full h-full"
            :class="
              pred.probability <= probThresh ? 'text-green-300' : 'text-red-300'"
            :is="pred.probability <= probThresh ? 'CheckCircleIcon' : 'XCircleIcon' "
        /></span>
        <span class="inline-block self-center flex-grow border-l pl-2 border-indigo-200">
          <b
            :class="pred.probability <= probThresh ? 'text-green-300' : ' text-red-300'"
            >{{ pred.probability }}% </b
          >of being delayed <b class="pt-5">{{ pred.result }}</b>
        </span>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { CheckCircleIcon,XCircleIcon } from "@heroicons/vue/outline";

export default {
  components: { CheckCircleIcon, XCircleIcon },
  props: ["flight", "predictions"],
  data() {
    return {
      probThresh: 30,
    };
  },
  computed: {},
};
</script>

<style></style>
