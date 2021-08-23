<template>
  <div class="mt-8 w-full flex flex-wrap justify-around">
    <form-block />
    <prediction-block />
  </div>
  <!-- instructions cards -->
  <div class="p-2 pb-6 mt-3 md:mt-8 w-full text-center">
    <h1 class="font-bold text-2xl md:text-3xl">
      How to get predictions for the probabilities of your flight being delayed
    </h1>

    <div class="font-medium text-base mx-2">
      <div class="mt-5 md:mt-10 card">
        <h3 class="font-bold block border-b pb-1 md:text-xl">
          Enter the flight's data
        </h3>
        <p class="block mt-2">
          for example for the flight SU6674 -> SU is the carrier code and 6674
          is the flight number
        </p>
      </div>
      <div class="mt-5 md:mt-10 card">
        <h3 class="font-bold block border-b pb-1 md: md:text-xl">
          Get predictions
        </h3>
        <p class="block mt-2">
          we use industry-leading AI tools to compare your flight with the ones
          in the database and calculate delay predictions for your flight, with
          an accuracy of up to 98%! You can read more about it in the
          <a
            class="underline text-green-300"
            href="https://www.willigetdelayed.com/about"
          >
            About page
          </a>
        </p>
      </div>
    </div>
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
