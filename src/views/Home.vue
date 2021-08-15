<template>
  <div class="mt-8 w-full flex flex-wrap justify-around">
    <form-block class="bg-gray-900 rounded-2xl shadow-2xl mx-2"></form-block>
    <prediction-block
      class="mx-2 w-full mt-7 sm:m-0 sm:w-5/12"
    ></prediction-block>
  </div>
</template>

<script>
import FormBlock from "@/components/FormBlock.vue";
import PredictionBlock from "@/components/PredictionBlock.vue";
export default {
  components: { FormBlock, PredictionBlock },
  name: "Home",
};
</script>
