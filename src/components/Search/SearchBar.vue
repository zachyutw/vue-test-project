/* eslint-disable @typescript-eslint/no-explicit-any */
<script>
// @ is an alias to /src
import { computed } from "vue";

export default {
  name: "SearchBar",
  props: {
    modelValue: String,
    onClick: Function,
    onClickClear: Function
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
    const handleOnClickClear = () => {
      emit("update:modelValue", "");
      props.onClickClear();
    };
    const showCloseBtn = computed(() => props.modelValue.length > 0);
    return {
      search,
      handleOnClickClear,
      handleOnClick,
      showCloseBtn
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
        v-show="showCloseBtn"
        type="button"
        @click="handleOnClickClear"
        class="icon-append close-btn btn btn-secondary"
      >
        <i class="fas fa-times" />
      </button>
      <button
        type="button"
        @click="handleOnClick"
        class="icon-append search-btn btn btn-secondary"
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

      height: 100%;
      display: flex;
      align-items: center;
      padding: 1em;
      z-index: 5;
      background-color: transparent;
      border-color: transparent;
    }
    .search-btn {
      right: 0;
      top: 0;
    }
    .close-btn {
      right: 40px;
      top: 0;
    }
    i {
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
    transition: border-bottom 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    padding-left: 0;
    &::placeholder {
      color: #fff;
    }
    &:hover {
      border-bottom: 3px solid rgba(0, 0, 0, 0.1);
      transition: border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    }
    &:focus {
      border-color: unset;
      box-shadow: unset;
      border-bottom: 2px solid #fff;
      transition: border-bottom 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    }
  }
}
</style>
