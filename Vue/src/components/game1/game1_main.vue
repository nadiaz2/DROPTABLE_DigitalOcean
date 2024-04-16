<template>
  <v-app>
    <v-app-bar density="compact" elevation="0" color="transparent">
      <div class="time">{{ currentTime }}</div>
      <v-img
        :src="batteryImage"
        alt="Battery"
        height="30px"
        class="battery"
      ></v-img>
    </v-app-bar>
    <v-container class="background">
      <v-row>
        <!-- Iterate over your items. Each v-col is set to span 3 columns -->
        <v-col
          cols="3"
          v-for="item in items"
          :key="item.name"
          class="d-flex flex-column align-center"
        >
          <v-card
            :image="item.logo"
            cover
            @click="navigateToPage(item.route)"
            class="app-card"
          >
          </v-card>
          <div class="card-label">{{ item.label }}</div>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog v-model="appState.showDialog" persistent max-width="600px">
      <v-card>
        <v-card-title class="text-h2">Email Details</v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <div><strong>To:</strong> {{ email.to }}</div>
              </v-col>
              <v-col cols="12">
                <div><strong>Subject:</strong> {{ email.subject }}</div>
              </v-col>
              <v-col cols="12">
                <div><strong>Message:</strong> {{ email.body }}</div>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey darken-1" text @click="appState.showDialog = false"
            >Close</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script setup>
import { ref, onMounted, onUnmounted, inject } from "vue";
import connection from "@/plugins/connection";

console.log("Setup function executed"); // This log will be displayed

const currentTime = ref(formatTime(new Date()));
const appState = inject("appState");

function formatTime(date) {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

// Update the time every second
let intervalId;
onMounted(() => {
  intervalId = setInterval(() => {
    currentTime.value = formatTime(new Date());
  }, 60000); // Update every minute (60,000 milliseconds)
});

// Clear the interval when the component unmounts
onUnmounted(() => {
  clearInterval(intervalId);
});

if (
  DeviceMotionEvent &&
  typeof DeviceMotionEvent.requestPermission === "function"
) {
  DeviceMotionEvent.requestPermission();
}


window.addEventListener("deviceorientation", handleOrientation);

function handleOrientation(event) {
  console.log(event.absolute);
  if (event.beta > 100 || event.beta < -100) {
    window.location.href = "pause.html";
  }
}

function until(conditionFunction) {
  const poll = (resolve) => {
    if (conditionFunction()) resolve();
    else setTimeout((_) => poll(resolve), 100);
  };

  return new Promise(poll);
}

watch(
  () => appState.showDialog,
  (newVal, oldVal) => {
    if (oldVal === true && newVal === false) {
      // Triggered when showDialog changes from true to false
      connection.send("02-DIALOGCLOSED"); // Replace with your specific message
    }
  }
);
</script>

<script>
import batteryImage from "@/assets/Battery.png";
import { ref, onMounted, onUnmounted, inject, watch} from "vue";
const appState = inject("appState");



export default {
  name: "game1_main",
  setup() {
    const appState = inject("appState");

    return {
      appState,
    };
  },
  data() {
    return {
      items: [
        {
          title: "Browser",
          label: "Browser",
          route: "game1_browser",
          logo: "https://www.logo.wine/a/logo/Google_Chrome/Google_Chrome-Logo.wine.svg",
        },
        {
          title: "Album",
          label: "Photos",
          route: "game1_album",
          logo: "https://9to5google.com/wp-content/uploads/sites/4/2020/06/google_photos_logo_2020.png",
        },
        {
          title: "Album",
          label: "Biscord",
          route: "album",
          logo: "https://cdn.logojoy.com/wp-content/uploads/20220329171749/discord-blue-app-logo.png",
        },
        {
          title: "Album",
          label: "Y",
          route: "album",
          logo: "https://cdn.logojoy.com/wp-content/uploads/20220329171747/blue-app-logo-twitter.jpg",
        },
        {
          title: "Album",
          label: "Bluedit",
          route: "album",
          logo: "https://cdn.logojoy.com/wp-content/uploads/20220329171609/reddit-social-media-app-logo.png",
        },
        {
          title: "Album",
          label: "GasAnA",
          route: "album",
          logo: "https://cdn.logojoy.com/wp-content/uploads/20220329171759/airbnb-pink-app-logo.png",
        },
        {
          title: "Album",
          label: "Linkeout",
          route: "album",
          logo: "https://cdn.logojoy.com/wp-content/uploads/20220329171743/linkedin-blue-app-logo.jpg",
        },
        {
          title: "Contacts",
          label: "Contacts",
          route: "game1_contact",
          logo: "https://cdn-icons-png.flaticon.com/512/3621/3621438.png",
        },
        {
          title: "Message",
          label: "Message",
          route: "game1_message",
          logo: "https://cdn-icons-png.flaticon.com/128/3991/3991948.png",
        },

        // ... more items ...
      ],
      email: {
        to: "recipient@example.com",
        subject: "Upcoming Event",
        body: "Hello, we are pleased to invite you to our upcoming event. Please let us know if you can attend. Best regards.",
      },
    };
  },
  methods: {
    flipListener(e) {
      console.log(page);
    },
    navigateToPage(routeName) {
      this.$router.push({ name: routeName });
    },
  },
};
</script>

<style scoped>
.v-app-bar {
  height: 30px;
  width: 100%;
}

.battery {
  margin-left: 55%;
}
.time {
  font-size: 15px;
  font-weight: bold;
  color: white;
  margin-left: 9%;
  /* margin-right: auto; */
  margin-bottom: 1%;
}

.app-card {
  border-radius: 15px;
  height: 60px;
  width: 60px;
  /* padding-right: 10%; */
  /* padding-left: 20%; */

  /* margin: 100px; */
}

.card-label {
  text-align: center;
  /* Center align the label */
  color: white;
  padding-top: 4%;
  /* Add any other styles you need */
}

.background {
  background-image: url("https://images.unsplash.com/photo-1572072393749-3ca9c8ea0831?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
  background-size: cover;
  /* Cover the entire viewport */
  background-position: center;
  /* Center the image */
  background-repeat: no-repeat;
  /* Do not repeat the image */
  height: 100vh;
  /* Full height of the viewport */
  width: 100vw;
  /* Full width of the viewport */
  padding-left: 8%;
  padding-right: 8%;
  padding-top: 17%;
}
</style>
