<template>
  <div :="$attrs">
    <form class="p-4">
        <div class="flex gap-3 ">
          <base-input type="text" placeholder="Milan">From</base-input>
          <base-input type="date">On</base-input>
        </div>
        <div class=" mt-5 flex gap-3">
          <base-input type="text" placeholder="Paris">To</base-input>
          <base-input type="text">Code</base-input>
        </div>
    </form>
  </div>
</template>

<script>
import BaseInput from "./BaseInput.vue";
export default {
  components: { BaseInput },
};
</script>

<style></style>
