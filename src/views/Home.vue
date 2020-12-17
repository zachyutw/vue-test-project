<script lang="ts">
import { mapGetters } from "vuex";
import SearchBar from "@/components/Search/SearchBar.vue";
import HelloWorld from "@/components/HelloWorld.vue";
import UserModel from "@/models/UserModel";
import WatchExample from "@/components/WatchExample.vue";
import VueTester from "@/components/VueTester.vue";
import VueEmitInput from "@/components/Input/VueEmitInput.vue";
import Button from "@/components/Button/Button.vue"; // @ is an alias to /src
import { ref, reactive, watch, computed } from "vue";
import { MutationTypes } from "@/store/modules/youtubeVideoModule";
import store from "@/store";
import YoutubeVideoCard from "@/components/Youtube/YoutubeVideoCard.vue";
import useSearchControl, {
  mapGettersList
} from "@/features/Search/useSearchControl";

export default {
  name: "Home",
  components: {
    HelloWorld,
    WatchExample,
    VueTester,
    VueEmitInput,
    Button,
    SearchBar,
    YoutubeVideoCard
  },
  // mounted() {
  //   store.dispatch(MutationTypes.SET_QUERY, "test");
  //   console.log(store["state"]);
  // },
  computed: {
    ...mapGetters(mapGettersList)
  },
  watch: {
    ["$store.getters.params"](newValue: any, oldValue: any) {
      console.log(`Updating from ${oldValue} to ${newValue}`);
    }
  },
  setup() {
    const { search, onSearchSubmit } = useSearchControl();

    const msg = ref(0);
    const emitValue = ref("");
    const message = ref("333");
    const user = reactive({
      id: 1,
      username: "_Test01",
      firstName: "Tester",
      LastName: "OB1",
      email: "test01ob1@test.com",
      abc: "123"
    } as UserModel);
    const handleOnClick = () => msg.value++;
    watch(search, () => {
      // console.log(search.value);
    });

    // console.log(search.value);

    return {
      msg,
      handleOnClick,
      user,
      message,
      test: "text",
      emitValue,
      isDraft: true,
      search,
      onSearchSubmit
    };
  }
};
</script>

<template>
  <div :data-testid="test" id="home" class="home">
    <div id="searchBar">
      <nav class="navbar container">
        <SearchBar v-model="search" @click="onSearchSubmit" />
      </nav>
    </div>
    <main>
      <div class="container">
        <div id="videosGrid">
          <div class="videoItem" v-for="item in items" :key="item.etag">
            <YoutubeVideoCard class="hvr-glow" :data="item" :key="item.etag" />
          </div>
        </div>
      </div>
    </main>

    <img alt="Vue logo" src="../assets/logo.png" />
    <Button
      class="btn btn-primary"
      text="Button slot tester"
      :data-name="123"
      data-test="test-id"
    />
    <Button
      class="btn btn-danger"
      text="Button slot tester"
      :data-name="123"
      data-test="test-id"
    >
      Button slot tester
    </Button>
    <!-- <TestInput /> -->
    <VueEmitInput v-model="message" />
    <VueTester v-model="message" />
    <WatchExample />
    <h1>{{ msg }}</h1>
    <p>{{ user.firstName }}</p>
    <button @click="handleOnClick">Add</button>
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<style lang="scss">
#searchBar {
  background-color: #ff5556;
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
