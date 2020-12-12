<template>
  <div>
    <label>
      Email
      <input type="email" v-model="input" name="email" />
    </label>
    <div v-if="input" :errors="errors">
      {{ errors }}
    </div>
    <div>
      {{ input }}
    </div>
  </div>
</template>
<script>
import { ref, watch } from "vue";

const isEmail = () => {
  const re = /\S+@\S+\.\S+/;
  return (input) => (re.test(input) ? null : "Must be a valid email address");
};

const useInputValidator = (startVal, onValidate) => {
  const input = ref(startVal);
  watch(input, (value) => {
    onValidate(value);
  });
  return {
    input,
  };
};
export default {
  name: "InputEmail",
  props: {
    value: String,
  },
  setup(props, { emit }) {
    const email = ref("");
    const { input, errors } = useInputValidator(email.value, isEmail(), (value) =>
      emit("input", value)
    );
    console.log(emit);
    return {
      input,
      errors,
    };
  },
};
</script>
