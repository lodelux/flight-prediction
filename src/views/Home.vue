<template>
  <div class="mt-16 w-full flex flex-wrap justify-around">
    <form-block class="bg-gray-900 rounded-2xl shadow-2xl mx-2"></form-block>
    <div class="bg-gray-900 rounded-2xl shadow-2xl mx-2 flex flex-col gap-2">
      <div
        v-for="pred in predictions"
        :key="pred.id"
        class="bg-purple-900 rounded-2xl shadow-xl"
      >
        {{ pred.result }} : {{ Math.floor(pred.probability * 100) }}%
      </div>
    </div>
  </div>
</template>

<script>
import FormBlock from "@/components/FormBlock.vue";
import { getPrediction } from "../services/amadeusApi";
import { mapState } from "vuex";
export default {
  components: { FormBlock },
  name: "Home",
  data() {
    return {
      predictions: "",
    };
  },
  computed: {
    ...mapState(["flight"]),
  },
  watch: {
    flight: {
      handler(flight) {
        getPrediction(flight).then((res) => (this.predictions = res.data));
      },
      deep: true,
    },
  },
};
</script>
