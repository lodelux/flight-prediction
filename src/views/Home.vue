<template>
  <div class="mt-8 w-full flex flex-wrap justify-around">
    <form-block />
    <prediction-block />
  </div>
  <div class="p-2 pb-6 mt-3 md:mt-8 w-full ">
    <h1 class="font-bold text-2xl md:text-4xl text-center">
      How does it work?
    </h1>
    <ul class="list-decimal font-medium text-base md:text-xl mx-6">
      <li class="mt-5 md:mt-10">
        <b class="font-bold">Enter the flight's data:</b> for example for the
        flight SU6674 -> SU is the carrier code and 6674 is the flight number
      </li>
      <li class="mt-5 md:mt-10">
        <b class="font-bold"> Get predictions:</b> we use industry-leading AI
        tools to compare your flight with the ones in the database, with an
        <a
          class="underline text-green-300"
          target="_blank"
          href="https://developers.amadeus.com/blog/flight-delay-prediction-machine-learning"
        >
          accuracy of up to 98%!</a
        >
      </li>
    </ul>
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
