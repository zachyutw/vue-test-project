<script lang="ts">
import HelloWorld from "@/components/HelloWorld.vue";
import UserModel from "@/models/UserModel";
import WatchExample from "@/components/WatchExample.vue";
import VueTester from "@/components/VueTester.vue";
import VueEmitInput from "@/components/Input/VueEmitInput.vue";
import Button from "@/components/Button/Button.vue"; // @ is an alias to /src
import { ref, reactive, watch } from "vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
    WatchExample,
    VueTester,
    VueEmitInput,
    Button
  },
  setup() {
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
    watch(message, () => {
      console.log(message.value);
    });
    return {
      msg,
      handleOnClick,
      user,
      message,
      test: "text",
      emitValue,
      isDraft: true
    };
  }
};
</script>

<template>
  <div :data-testid="test" id="home" class="home">
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
    <TestInput />
    <VueEmitInput v-model="message" />
    <VueTester v-model="message" />
    <WatchExample />
    <h1>{{ msg }}</h1>
    <p>{{ user.firstName }}</p>
    <button @click="handleOnClick">Add</button>
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>
