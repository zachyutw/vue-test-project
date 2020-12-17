import { ref, watch, onBeforeMount, computed } from "vue";
import { mapGetters } from "vuex";
import store from "@/store";
import {
  MutationTypes,
  ActoinTypes,
  getters
} from "@/store/modules/youtubeVideoModule";

export default function() {
  const search = ref(store.getters.q);
  onBeforeMount(() => {
    store.dispatch(ActoinTypes.SEARCH_VIDEOS);
  });
  watch(search, () => {
    // console.log(search.value);
  });
  const onSearchSubmit = (query: string) => {
    store.dispatch(MutationTypes.SET_START, 0);
    store.dispatch(MutationTypes.SET_QUERY, query);
    store.dispatch(ActoinTypes.SEARCH_VIDEOS);
  };

  const onSearchClear = () => {
    store.dispatch(MutationTypes.SET_QUERY, "");
    store.dispatch(MutationTypes.SET_START, 0);
    store.dispatch(ActoinTypes.SEARCH_VIDEOS);
  };

  const onSetStart = (value: number) => {
    store.dispatch(MutationTypes.SET_START, value * 10);
  };

  const onLoadMore = () => {
    store.dispatch(ActoinTypes.LOAD_MORE_VIDEOS);
  };

  return {
    onSearchSubmit,
    onSearchClear,
    onSetStart,
    onLoadMore,
    search
  };
}

export const mapGettersList = Object.keys(getters);
