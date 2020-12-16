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
    SearchBar
  },
  // mounted() {
  //   store.dispatch(MutationTypes.SET_QUERY, "test");
  //   console.log(store["state"]);
  // },
  computed: {
    ...mapGetters(mapGettersList)
  },
  watch: {
    ["$store.getters.start"](newValue: any, oldValue: any) {
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
      <h1>{{ q }}</h1>
      <nav class="navbar container">
        <SearchBar v-model="search" @click="onSearchSubmit" />
      </nav>
    </div>
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
    justify-content: center;
  }
}
</style>
