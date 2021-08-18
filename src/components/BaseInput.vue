<template>
  <div class="bg-transparent border-0 p-0 flex-1">
    <label class="block text-center font-medium">
      {{ label }}
      <slot />
    </label>
    <input
      v-if="!date"
      :="$attrs"
      :value="modelValue"
      @change="
        $event.target.blur();
        this.$emit('update:modelValue', $event.target.value);
      "
      class="
        block
        mt-1
        w-full
        lg:w-40
        md:w-40
        rounded-2xl
        text-center
        bg-transparent
        border-2 border-purple-900
      "
    />
    <DatePicker
      v-if="date"
      is-dark
      :modelValue="modelValue"
      @update:modelValue="formatAndEmit($event)"
    >
      <template v-slot="{ inputValue, inputEvents }">
        <input
          readonly
          :="$attrs"
          type="text"
          class="
            cursor-pointer
            block
            mt-1
            w-full
            lg:w-40
            md:w-40
            rounded-2xl
            text-center
            bg-transparent
            border-2 border-purple-900
          "
          :value="inputValue"
          v-on="inputEvents"
        />
      </template>
    </DatePicker>
  </div>
</template>

<script>
import { DatePicker } from "v-calendar";
import { dateToString } from "../services/utils";

export default {
  components: { DatePicker },
  props: {
    modelValue: {
      default: "",
    },
    date: {
      default: false,
    },
    label: {
      default: "",
    },
  },
  methods: {
    formatAndEmit(e) {
      this.$emit("update:modelValue", dateToString(e));
    },
  },
};
</script>

<style></style>
