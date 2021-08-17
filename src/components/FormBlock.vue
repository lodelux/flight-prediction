<template>
  <form
    class="
      bg-gray-900
      flex flex-col
      justify-evenly
      rounded-2xl
      shadow-2xl
      mx-2
      p-4
    "
  >
    <div class="block mb-6 font-bold text-center text-xl">
      Enter your flight data
    </div>
    <div class="flex space-x-3 justify-center">
      <base-input
        type="text"
        placeholder="SU"
        v-model="searched.carrierCode"
        :label="'Carrier Code *'"
      />
      <base-input
        type="text"
        placeholder="6674"
        v-model="searched.flightNumber"
        :label="'Flight Number *'"
      />
    </div>
    <div class="mt-5 sel flex space-x-3 justify-center">
      <base-input
        :date="true"
        v-model="searched.scheduledDepartureDate"
        placeholder="08/28/2021"
        :label="'Departure Date *'"
      />

      <!-- v-model="searched.operationalSuffix" -->
      <base-input
        type="text"
        placeholder=""
        disabled
        :label="'Delay Code'"
      />
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
        _searched.carrierCode = _searched.carrierCode.toUpperCase();
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
