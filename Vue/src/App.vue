

<template>

  <RouterView :key="$route.fullPath" />





</template>

<script>
import { RouterLink,RouterView } from "vue-router";
import { defineComponent, ref, onMounted, onUnmounted, provide, reactive } from "vue";
import connection from "@/plugins/connection"; // Adjust path as necessary

export default defineComponent({
  name: "App",
  setup() {
    const appState = reactive({
      status: 'idle'
    });

    const keyPhoto = reactive({
      visibility: 'show'  // Assuming this controls whether certain photos are visible
    });

    function changeAppState(newState) {
      appState.status = newState;  // Update the status property
      console.log(`State updated to: ${newState}`);
    }

    function handleMessages(message) {
      console.log(`Message received: ${message}`);
      changeAppState(message);  // Use the changeAppState function to update state
    }

    onMounted(() => {
      connection.onUnityMessage = handleMessages; // Listen to messages when component mounts
    });

    onUnmounted(() => {
      connection.onUnityMessage = null; // Clean up on component unmount
    });

    provide("appState", appState);
    provide("keyPhoto", keyPhoto);
    provide("changeAppState", changeAppState);  // Provide the method as well

    return {};
  },
});
</script>

<style scoped>
.app-card {
  border-radius: 10px;
  height: 70px;
  width: 70px;
}

.background {
  background-image: url("https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1");
}

.app-card {
  margin: auto;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
