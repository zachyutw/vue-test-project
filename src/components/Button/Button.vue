<template>
  <button v-bind="$attrs">
    <slot>{{ text }}</slot>
  </button>
</template>
<script>
export default {
  inheritAttrs: false,
  props: {
    text: String,
    name: String
  },
  setup(props) {
    return {};
  }
};
</script>
