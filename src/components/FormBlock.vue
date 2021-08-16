<template>
  <form class="bg-gray-900 rounded-2xl shadow-2xl mx-2 p-4">
    <div class="block mb-6 font-bold text-center text-xl">
      Enter your flight data
    </div>
    <div class="flex space-x-3 justify-center">
      <base-input type="text" placeholder="AZ" v-model="searched.carrierCode"
        >Carrier Code</base-input
      >
      <base-input type="text" placeholder="1234" v-model="searched.flightNumber"
        >Flight Number</base-input
      >
    </div>
    <div class="mt-5 flex space-x-3 justify-center">
      <base-input
      class="flex-1"
        type="date"
        v-model="searched.scheduledDepartureDate"
        >Departure Date</base-input
      >
      <!-- v-model="searched.operationalSuffix" -->
      <base-input class="flex-1" type="text" placeholder="not implemented yet" disabled
        >Delay Code</base-input
      >
    </div>
  </form>
</template>

<script>
import BaseInput from "./BaseInput.vue";
import { sleep } from "../services/utils";
export default {
  components: { BaseInput },
  data() {
    return {
      searched: {
        carrierCode: "",
        flightNumber: "",
        scheduledDepartureDate: "",
        // operationalSuffix: "",
      },
    };
  },
  methods: {
    resetForm() {
      this.searched = {
        carrierCode: "",
        flightNumber: "",
        scheduledDepartureDate: "",
      };
    },
  },
  watch: {
    searched: {
      handler(_searched) {
        let filled = true;
        for (let key in _searched) {
          if (key != "operationalSuffix" && !_searched[key]) {
            filled = false;
          }
        }
        if (filled) {
          this.$store.dispatch("getFlight", _searched);
          //temporary workaround for reset Bug
          sleep(1).then(() => {
            this.resetForm();
          });
        }
      },
      deep: true,
    },
  },
};
</script>

<style></style>
