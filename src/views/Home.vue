<script>
import { mapGetters } from "vuex";
import SearchBar from "@/components/Search/SearchBar.vue"; // @ is an alias to /src
import { computed } from "vue";
// import { MutationTypes } from "@/store/modules/youtubeVideoModule";
import store from "@/store";
import YoutubeVideoCard from "@/components/Youtube/YoutubeVideoCard.vue";
import useSearchControl, {
  mapGettersList
} from "@/features/Search/useSearchControl";
import Pagination from "@/components/Pagination/Pagination.vue";

export default {
  name: "Home",
  components: {
    SearchBar,
    YoutubeVideoCard,
    Pagination
  },
  computed: {
    ...mapGetters(mapGettersList)
  },
  setup() {
    const {
      search,
      onSearchSubmit,
      onSetStart,
      onSearchClear
    } = useSearchControl();

    const videos = computed(() =>
      store.getters.items.slice(store.getters.start, store.getters.start + 10)
    );
    const pages = computed(() =>
      Math.floor(store.getters.items.length / 10 + 1)
    );

    return {
      onSearchSubmit,
      onSearchClear,
      videos,
      pages,
      onSetStart,
      search
    };
  }
};
</script>

<template>
  <div id="home" class="home">
    <div id="header">
      <nav class="navbar container">
        <SearchBar
          v-model="search"
          @click="onSearchSubmit"
          :onClickClear="onSearchClear"
        />
      </nav>
    </div>
    <main>
      <div class="container">
        <div id="videosGrid">
          <div class="videoItem" v-for="viedo in videos" :key="viedo.etag">
            <YoutubeVideoCard
              class="hvr-glow"
              :data="viedo"
              :key="viedo.etag"
            />
          </div>
        </div>
        <Pagination :buttonOnClick="onSetStart" :start="start" :pages="pages" />
      </div>
    </main>
  </div>
</template>

<style lang="scss">
#header {
  background-color: #ff5556;
  padding: 14px;
  nav {
    width: 60%;
    justify-content: center;
  }
}
#videosGrid {
  $bs-xs: 576px;
  $bs-sm: 768px;
  display: grid;
  padding: 28px;
  grid-template-columns: 33% 33% 33%;
  @media (max-width: $bs-sm) {
    grid-template-columns: 50% 50%;
  }
  @media (max-width: $bs-xs) {
    grid-template-columns: 100%;
  }
}
.videoItem {
  padding: 14px;
  .videoItemContent {
    background: #ff5556;
    width: 100%;
    min-height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  /* outline: 14px solid blue; */
}
</style>
