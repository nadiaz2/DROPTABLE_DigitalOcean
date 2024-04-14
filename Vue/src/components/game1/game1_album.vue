<template>
  <v-app>
    <v-container>
      <v-app-bar elevation="0" aspect-ratio="1" class="bar">
        <v-btn @click="navigateToPage(route)">
          <v-icon size="40">mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title class="title-size">Album</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-app-bar>
    </v-container>

    <v-container class="photo">
      <v-row>
        <v-col v-for="(item, index) in items" :key="index" cols="4" class="no-padding">
          <div @click="showImage(item)" class="image-container cursor-pointer">
            <v-img :src="item.image" aspect-ratio="1" cover></v-img>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <v-overlay :value="showOverlay" @click="showOverlay = false">
      Overlay is active
    </v-overlay>
  </v-app>
</template>

<script>
import connection from "@/plugins/connection";
export default {
  name: "game1_album",
  props: ["appState", "changeAppState"],

  data() {
    return {
      showOverlay: false,
      selectedImage: "",
      route: "game1_main",
      items: [
        {
          Message: "",
          image:
            "https://cdn.photoswipe.com/photoswipe-demo-images/photos/2/img-2500.jpg",
          sent: false,
        },
        {
          Message: "01-FOUNDPHOTO",
          image:
            "https://cdn.photoswipe.com/photoswipe-demo-images/photos/1/img-2500.jpg",
          sent: false,
        },
        {
          Message: "",
          image:
            "https://cdn.photoswipe.com/photoswipe-demo-images/photos/2/img-2500.jpg",
          sent: false,
        },
        {
          Message: "",
          image:
            "https://cdn.photoswipe.com/photoswipe-demo-images/photos/2/img-2500.jpg",
          sent: false,
        },
        {
          Message: "",
          image:
            "https://cdn.photoswipe.com/photoswipe-demo-images/photos/2/img-2500.jpg",
          sent: false,
        },
        {
          Message: "",
          image:
            "https://cdn.photoswipe.com/photoswipe-demo-images/photos/2/img-2500.jpg",
          sent: false,
        },
        {
          Message: "",
          image:
            "https://cdn.photoswipe.com/photoswipe-demo-images/photos/2/img-2500.jpg",
          sent: false,
        },
        {
          Message: "",
          image:
            "https://cdn.photoswipe.com/photoswipe-demo-images/photos/2/img-2500.jpg",
          sent: false,
        },
        {
          Message: "",
          image:
            "https://cdn.photoswipe.com/photoswipe-demo-images/photos/2/img-2500.jpg",
          sent: false,
        },
        {
          Message: "",
          image:
            "https://cdn.photoswipe.com/photoswipe-demo-images/photos/2/img-2500.jpg",
          sent: false,
        },
        {
          Message: "",
          image:
            "https://cdn.photoswipe.com/photoswipe-demo-images/photos/2/img-2500.jpg",
          sent: false,
        },
        {
          Message: "",
          image:
            "https://cdn.photoswipe.com/photoswipe-demo-images/photos/2/img-2500.jpg",
          sent: false,
        },
        {
          Message: "",
          image:
            "https://cdn.photoswipe.com/photoswipe-demo-images/photos/2/img-2500.jpg",
          sent: false,
        },
        // Add more image URLs here
      ],
      messageState: "idle", // Use a state indicator
    };
  },

  mounted() {
    if (this.appState === "02-START") {
      this.startTimer();
    }
  },

  computed: {
    filteredItems() {
      // This computed property will automatically update when items' 'sent' status changes
      return this.items.filter((item) => !item.sent);
    },
    isMessageActive() {
      // Compute based on appState to determine if messages can be sent
      return this.appState.status === "01-START";
    },
  },

  methods: {
    navigateToPage(routeName) {
      this.$router.push({ name: routeName });
    },

    sendMsg(item) {
      if (this.isMessageActive && item.Message === "01-FOUNDPHOTO") {
        console.log("Sending message...", item.Message);
        connection.send(item.Message); // Send the message

        this.changeAppState("finished"); // Notify `App.vue` to change the global state
      }
    },

    showImage(item) {
      this.selectedImage = item.image;
      this.showOverlay = true;

      if (item.Message && this.isMessageActive) {
        this.sendMsg(item);
      }

      console.log("Overlay should be shown:", this.showOverlay);
    },
    startTimer() {
      setTimeout(() => {
        connection.send("02-ALBUM");
      }, 3000);
    },
  },

  watch: {
    // Watch for changes in appState and react accordingly
    "appState.status"(newStatus) {
      if (newStatus === "01-FINISH") {
        // When message is "finished", mark the special item as sent
        this.items.forEach((item) => {
          if (item.Message === "01-FOUNDPHOTO") {
            item.sent = true;
          }
        });
      }
      if (newStatus === "02-START") {
        this.startTimer();
      }
    },
  },
};
</script>

<style scoped>
.photo {
  margin-top: 10%;
}

.no-padding {
  padding: 1% !important;
}

.bar {
  padding-top: 2%;
}

.title-size {
  font-size: 150%;
  /* font-weight: bold; */
  /* color: white; */
}
</style>
