<template>
  <div class="mt-16 w-full flex flex-wrap justify-around ">
    <form-block class=" bg-gray-900 rounded-2xl shadow-2xl mx-2"></form-block>
    <div class="w-1/3 bg-transparent"></div>
  </div>
</template>

<script>
import FormBlock from "@/components/FormBlock.vue";
export default {
  components: { FormBlock },
  name: "Home",
};
</script>
