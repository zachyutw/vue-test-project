<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <VueTester />
    <WatchExample />
    <h1>{{ msg }}</h1>
    <p>{{ user.firstName }}</p>
    <button @click="handleOnClick">Add</button>
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import HelloWorld from "@/components/HelloWorld.vue";
import UserModel from "@/models/UserModel";
import WatchExample from "@/components/WatchExample.vue";
import VueTester from "@/components/VueTester.vue"; // @ is an alias to /src
import * as Vue from "vue";
const { ref, reactive, watchEffect } = Vue;
const Home = {
  name: "Home",
  components: {
    HelloWorld,
    WatchExample,
    VueTester,
  },
  setup() {
    const msg = ref(0);
    const user = reactive({
      id: 1,
      username: "_Test01",
      firstName: "Tester",
      LastName: "OB1",
      email: "test01ob1@test.com",
      abc: "123",
    } as UserModel);
    const handleOnClick = () => msg.value++;

    return {
      msg,
      handleOnClick,
      user,
    };
  },
};

export default Home;
</script>
