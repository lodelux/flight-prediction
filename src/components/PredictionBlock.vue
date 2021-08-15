<template>
  <div :="$attrs">
    <predictions
      :flight="flight"
      :predictions="predictions"
      :error="error"
      :loading="loading"
    >
    </predictions>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Predictions from "./Predictions.vue";

export default {
  components: { Predictions },
  // data() {
  //   return {
  //     flight: {
  //       originLocationCode: "MXP",
  //       destinationLocationCode: "LEP",
  //     },
  //     predictions: "",
  //     // predictions: [
  //     //   {
  //     //     id: "SU6674MXPLED20210828",
  //     //     probability: 38,
  //     //     result: "less than 30 minutes",
  //     //     subType: "flight-delay",
  //     //     type: "prediction",
  //     //   },
  //     //   {
  //     //     id: "SU6674MXPLED20210828",
  //     //     probability: 32,
  //     //     result: "between 30 and 60 minutes",
  //     //     subType: "flight-delay",
  //     //     type: "prediction",
  //     //   },
  //     //   {
  //     //     id: "SU6674MXPLED20210828",
  //     //     probability: 20,
  //     //     result: "between 60 and 120 minutes",
  //     //     subType: "flight-delay",
  //     //     type: "prediction",
  //     //   },
  //     //   {
  //     //     id: "SU6674MXPLED20210828",
  //     //     probability: 10,
  //     //     result: "over 120 minutes or cancelled",
  //     //     subType: "flight-delay",
  //     //     type: "prediction",
  //     //   },
  //     // ],
  //     error: "no prediction",
  //   };
  // },
  computed: {
    ...mapState(["flight", "error", "loading", "predictions"]),
  },
  watch: {
    flight: {
      handler(flight) {
        this.$store.dispatch("getPredictions", flight);
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
b {
  @apply font-extrabold;
}
</style>
