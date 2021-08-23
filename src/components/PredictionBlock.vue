<template>
  <!-- load only if it's needed -->
  <div
    v-if="predictions[0] || loading || (error && !close)"
    class="mx-2 w-full mt-7 sm:m-0 sm:w-5/12"
  >
    <div v-if="loading" class="w-full flex justify-center mt-10">
      <base-loading class="w-14" />
    </div>
    <predictions
      v-if="predictions[0]"
      :flight="flight"
      :predictions="predictions"
    />
    <base-msg
      v-if="!predictions[0] && error && !close"
      :message="errorMessage"
      @close="
        () => {
          this.close = true;
        }
      "
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import Predictions from "./Predictions.vue";
import BaseLoading from "./BaseLoading.vue";
import BaseMsg from "./BaseMsg.vue";

export default {
  components: { Predictions, BaseLoading, BaseMsg },
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
  data() {
    return {
      close: false,
    };
  },
  computed: {
    ...mapState(["flight", "error", "loading", "predictions"]),
    errorMessage: function () {
      switch (this.error) {
        case "flight":
          return "an error has occurred while searching for your flight, check if your input is correct or try again later ";

        case "prediction":
          return "an error has occurred while trying to get predictions for your flight, check if your input is correct or try again later please";

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
    flight: {
      handler(flight) {
        this.$store.dispatch("getPredictions", flight);
      },
      deep: true,
    },
    error: function () {
      this.close = false;
    },
  },
};
</script>

<style scoped>
b {
  @apply font-extrabold;
}
</style>
