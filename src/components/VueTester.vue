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
    <div>
      <p>Message</p>
      {{ message }}
    </div>
  </div>
</template>
<script>
import { ref, watch, computed } from "vue";

const isEmail = email => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email) ? null : "Must be a valid email address";
};

const useInputValidator = (startVal, onValidate) => {
  const input = ref(startVal);
  const errors = ref(null);
  watch(input, value => {
    errors.value = onValidate(value);
  });
  return {
    input,
    errors
  };
};
export default {
  name: "InputEmail",
  props: {
    value: String
  },
  setup(props, { emit }) {
    const email = ref("");
    const { input, errors } = useInputValidator(email.value, isEmail);
    const message = computed({
      get: () => props.value,
      set: value => emit("update:value", value)
    });
    return {
      input,
      errors,
      message
    };
  }
};
</script>
