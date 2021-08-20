<template>
  <div class="mt-8 w-full flex flex-wrap justify-around">
    <form-block />
    <prediction-block />
  </div>
  <div class="p-2 pb-6 mt-3 md:mt-8 w-full text-center">
    <h1 class="font-bold text-2xl md:text-3xl">
      How to get Flight delay prediction
    </h1>
    <ul class="font-medium text-base mx-2">
      <li class="mt-5 md:mt-10 card">
        <b class="font-bold block border-b pb-1 md:text-xl"
          >Enter the flight's data</b
        >
        <p class="block mt-2">
          for example for the flight SU6674 -> SU is the carrier code and 6674
          is the flight number
        </p>
      </li>
      <li class="mt-5 md:mt-10 card">
        <b class="font-bold block border-b pb-1 md: md:text-xl"
          >Get predictions</b
        >
        <p class="block mt-2">
          we use industry-leading AI tools to compare your flight with the ones
          in the database and calculate delay predictions for your flight, with
          an
          <a
            class="underline text-green-300"
            target="_blank"
            href="https://developers.amadeus.com/blog/flight-delay-prediction-machine-learning"
          >
            accuracy of up to 98%!</a
          >
        </p>
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
