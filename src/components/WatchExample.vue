<template>
  <h2>Watchers in Vue 3</h2>
  <input type="text" v-model="search" />
  <div>{{ search }}</div>
  <div>{{ stringPlus }}</div>
  <button @click="clear">Clear</button>
</template>
<script>
import { ref, watch, computed } from "vue";

export default {
  setup(props, { emit }) {
    const initSearch = "";
    const search = ref(initSearch);
    const stringTest = ref("");
    watch(
      () => search.value,
      (value, state) => {
        emit("update:search", search.value);
        // console.log(search.value, "search");
        // console.log(value, "new value");
        // console.log(state, "last state");
      }
    );

    watch(stringTest, () => {
      console.log(stringTest.value, "string test");
    });

    const clear = () => {
      search.value = initSearch;
    };

    const stringPlus = computed({
      get: () => search.value + "+",
      set: val => {
        stringTest.value = val + "123";
        console.log(val);
      }
    });
    return {
      search,
      clear,
      stringPlus
    };
  }
};
</script>
