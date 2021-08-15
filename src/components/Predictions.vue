<template>
  <div class="text-xl font-semibold">
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
</template>

<script>
export default {
  props: ["flight", "predictions"],
  data() {
    return {};
  },
  computed: {},
};
</script>

<style></style>
