<template>
  <div class="mt-8 w-full flex flex-wrap justify-around">
    <form-block />
    <prediction-block />
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
