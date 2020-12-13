<template>
  <div>
    <!-- emit input first example -->
    <label>
      Emit Input
      <input type="email" name="email" :value="modelValue" @input="onInput" />
    </label>
    <!-- emit input second example -->
    <label>
      Emit Input 2
      <input type="email" name="email" v-model="message" />
    </label>
    <div>
      <p>Message</p>
      {{ message }}
    </div>
  </div>
</template>
<script>
import { computed } from "vue";

export default {
  name: "EmitInput",
  props: {
    modelValue: String,
  },
  setup(props, { emit }) {
    const message = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value),
    });
    const onInput = (event) => emit("update:modelValue", event.target.value);
    return {
      message,
      onInput,
    };
  },
};
</script>
