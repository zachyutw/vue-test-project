/* eslint-disable @typescript-eslint/no-explicit-any */
<script>
// @ is an alias to /src
import { computed } from "vue";

export default {
  name: "SearchBar",
  props: {
    modelValue: String,
    onClick: Function
  },
  setup(props, { emit }) {
    const search = computed({
      get: () => props.modelValue,
      set: value => emit("update:modelValue", value)
    });
    const handleOnClick = e => {
      if (e) {
        event.preventDefault();
      }
      props.onClick(props.modelValue);
    };
    return {
      search,
      handleOnClick
    };
  }
};
</script>

<template>
  <form id="searchForm">
    <div class="input-group">
      <input
        type="text"
        v-model="search"
        class="form-control"
        name="search-videos"
        placeholder="熱門音樂"
      />
      <button
        type="button"
        @click="handleOnClick"
        class="icon-append btn btn-secondary"
      >
        <i class="fa fa-search" />
      </button>
    </div>
  </form>
</template>

<style lang="scss">
#searchForm {
  width: 100%;
  background: inherit;
  .input-group {
    position: relative;
    .icon-append {
      position: absolute;
      right: 0;
      top: 0;
      height: 100%;
      display: flex;
      align-items: center;
      padding: 1em;
      z-index: 5;
      background-color: transparent;
      border-color: transparent;
    }
    i.fa-search {
      color: white;
    }
  }
  input {
    color: #fff;
    border-radius: 0;
    background: inherit;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1px solid #fff;
    transition: border-bottom 0.15s ease-in-out;
    padding-left: 0;
    &::placeholder {
      color: #fff;
    }
    &:focus {
      border-color: unset;
      box-shadow: unset;
      border-bottom: 2px solid #fff;
      transition: border-bottom 0.15s ease-in-out;
    }
  }
}
</style>
