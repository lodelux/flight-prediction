<template>
  <div :="$attrs">
    <form class="p-4">
      <div class="flex gap-3 justify-center">
        <base-input type="text" placeholder="AZ" v-model="searched.carrierCode"
          >Carrier Code</base-input
        >
        <base-input
          type="text"
          placeholder="1234"
          v-model="searched.flightNumber"
          >Flight Number</base-input
        >
      </div>
      <div class="mt-5 flex gap-3 justify-center flex-initial">
        <base-input
          type="date"
          placeholder="2021-08-28"
          v-model="searched.scheduledDepartureDate"
          >Departure Date</base-input
        >
        <!-- v-model="searched.operationalSuffix" -->
        <base-input type="text">Delay Code</base-input>
      </div>
    </form>
  </div>
</template>

<script>
import BaseInput from "./BaseInput.vue";
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
        }
      },
      deep: true,
    },
  },
};
</script>

<style></style>
