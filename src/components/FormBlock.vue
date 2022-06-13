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
        placeholder="FR"
        v-model="searched.carrierCode"
        :label="'Carrier Code'"
      />
      <base-input
        type="text"
        placeholder="1303"
        v-model="searched.flightNumber"
        :label="'Flight Number'"
      />
    </div>
    <div class="mt-5 sel flex space-x-3 justify-center">
      <base-input
        :date="true"
        v-model="searched.scheduledDepartureDate"
        placeholder="01/07/2022"
        :label="'Departure Date'"
      />
      <div
        key="checkbox"
        v-if="!delayed"
        class="
          border-0
          p-0
          flex-1
          self-center
          h-full
          flex
          space-x-3
          items-end
          pb-3
          justify-center
        "
      >
        <input
          class="inline-block mb-1 rounded"
          type="checkbox"
          v-model="delayed"
        />
        <label class="inline-block">Delayed flight?</label>
      </div>
      <div v-if="delayed" key="inputbox" class="flex-1 self-center h-full">
        <base-input
          key="input"
          v-model="searched.operationalSuffix"
          type="text"
          placeholder=""
          :label="'Delay Code'"
          ><input type="checkbox" class="rounded" v-model="delayed" />
        </base-input>
      </div>
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
      delayed: false,
      searched: {
        carrierCode: "",
        flightNumber: "",
        scheduledDepartureDate: "",
        operationalSuffix: null,
      },
    };
  },
  methods: {
    //resets all inputs
    resetForm() {
      this.searched = {
        carrierCode: "",
        flightNumber: "",
        scheduledDepartureDate: "",
        operationalSuffix: null,
      };
    },
    //carrier code to upper, check if all inputs are fille and submit
    validateAndSend() {
      let filled = true;
      for (let key in this.searched) {
        //if not all inputs are filled, then filled is false
        if (
          (key != "operationalSuffix" && !this.searched[key]) ||
          (key === "operationalSuffix" && this.delayed && !this.searched[key])
        ) {
          filled = false;
        }
      }
      if (filled) {
        //tmp or it will overwrite the original object
        let formToSend = { ...this.searched };
        formToSend.carrierCode = formToSend.carrierCode.toUpperCase();
        if (!this.delayed) {
          delete formToSend.operationalSuffix;
        }
        this.$store.dispatch("getFlight", formToSend);
        //temporary workaround for reset Bug
        sleep(1).then(() => {
          this.resetForm();
        });
      }
    },
  },
  watch: {
    searched: {
      handler() {
        this.validateAndSend();
      },
      deep: true,
    },
    delayed: function () {
      this.validateAndSend();
    },
  },
};
</script>

<style></style>
