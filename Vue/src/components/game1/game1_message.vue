<template>
  <v-app>
    <v-toolbar color="deep-purple accent-3" dark>
      <v-btn icon @click="navigateToPage(route)">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>Messages</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-toolbar>

    <v-container>
      <v-list>
        <v-list-item-group>
          <v-list-item
            v-for="(message, index) in messages"
            :key="index"
            @click="selectMessage(message, appState)"
          >
            <v-list-item-content>
              <v-list-item-title v-html="message.title"></v-list-item-title>
              <v-list-item-subtitle
                v-html="message.subtitle"
              ></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-container>
  </v-app>
</template>


<script>

import connection from "@/plugins/connection";
import { inject, onMounted, ref, watch } from 'vue';

export default {
  created() {
    const appState = inject("appState");
    if (appState.status === "02-START") {
      connection.send("02-CHATAPP");
    }

  },
  setup() {
    const messages = [
      {
        title: "Jane Doe",
        subtitle: "Meeting at 2 PM?",
        message: "",
      },
      {
        title: "John Smith",
        subtitle: "Server maintenance tonight.",
        message: "",
      },
      {
        title: "Alice Johnson",
        subtitle: "New project proposal.",
        message: "",
      },
      {
        title: "Bob Brown",
        subtitle: "Lunch at 12 PM?",
        message: "",
      },
      {
        title: "Eve White",
        subtitle: "New job opportunity.",
        message: "",
      },
      {
        title: "Rachel Thomas",
        subtitle: "Hey, can we meet in your lab so I can ask you a question?",
        message: "02-FINISH",
      },

      // More messages...
    ];

    const appState = inject("appState"); // Injecting the app state

    return { messages, appState, route: 'game1_main'};
  },
  methods: {
    flipListener(e) {
      console.log(page);
    },
    navigateToPage(routeName) {
      this.$router.push({ name: routeName });
    },
    selectMessage(message, appState) {
      if (appState.status === "02-START" && message.message) {
        console.log("Status is START. Sending message:", message.message);
        connection.send(message.message); // Send the message using connection.send
      } else {
        console.log("Status is not START or message field is empty.");
      }
    }
  },
};
</script>

<style>
.v-list-item--link:hover {
  background-color: #f5f5f5 !important;
}
</style>
