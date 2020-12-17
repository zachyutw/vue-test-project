<script>
import { computed } from "vue";

export default {
  props: {
    buttonOnClick: Function,
    start: Number,
    pages: Number
  },
  setup(props) {
    const items = computed(() => [...Array(props.pages).keys()]);
    return { items };
  }
};
</script>
<template>
  <div class="pagingation-root">
    <button
      type="button"
      class="btn btn-circle btn-md"
      v-for="value in items"
      :key="value"
      :actived="start === value * 10"
      @click="() => buttonOnClick(value)"
    >
      {{ value + 1 }}
    </button>
  </div>
</template>

<style lang="scss">
.pagingation-root {
  padding: 14px;
  overflow-x: auto;
  white-space: nowrap;
  button {
    margin: 8px;
    border-radius: 50%;
    &[actived="true"] {
      background-color: rgb(255, 85, 86);
      color: #fff;
    }
  }
  .btn-circle.btn-md {
    width: 40px;
    height: 40px;
    padding: 5px 8px;
    border-radius: 25px;
    font-size: 14px;
    font-weight: 800;
    text-align: center;
  }
}
</style>
