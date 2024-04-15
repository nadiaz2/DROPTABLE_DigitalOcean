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
          <div v-if="keyPhoto.visibility !== 'invisible' || item.Message !== '01-FOUNDPHOTO'" @click="showImage(item)" class="image-container cursor-pointer">
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
import { inject, onMounted, ref, watch } from 'vue';
import connection from "@/plugins/connection"; // Ensure this is the correct path

export default {
  name: "game1_album",

  setup() {
    const appState = inject('appState');
    const changeAppState = inject('changeAppState');
    const keyPhoto = inject('keyPhoto');

    const showOverlay = ref(false);
    const selectedImage = ref('');
    const items = ref([
      {
        Message: "",
        image: "https://cdn.photoswipe.com/photoswipe-demo-images/photos/2/img-2500.jpg",
        sent: false,
      },
      {
        Message: "",
        image: "https://cdn.photoswipe.com/photoswipe-demo-images/photos/1/img-2500.jpg",
        sent: false,
      },
      {
        Message: "",
        image: "./src/assets/Album/ins.png",
        sent: false,
      },
      {
        Message: "01-FOUNDPHOTO",
        image: "./src/assets/Album/Skirt.png",
        sent: false,
      },
      // Add more items as needed
    ]);

    function navigateToPage(routeName) {
      this.$router.push({ name: routeName });
    }

    function sendMsg(item) {
      if (appState.status === "01-START" && item.Message) {
        console.log("Sending message...", item.Message);
        connection.send(item.Message);
        changeAppState("finished");
      }
    }

    function showImage(item) {
      selectedImage.value = item.image;
      showOverlay.value = true;

      if (item.Message && appState.status === "01-START") {
        sendMsg(item);
      }
    }

    function startTimer() {
      setTimeout(() => {
        if (appState.status === "02-START") {
          console.log("Timer complete, sending '02-ALBUM'");
          connection.send("02-ALBUM");
        }
      }, 1000); // 1 second as originally intended
    }

    watch(() => appState.status, (newStatus) => {
      console.log("Status changed to:", newStatus);
      if (newStatus === "01-FINISH") {
        items.value.forEach((item) => {
          if (item.Message === "01-FOUNDPHOTO") {
            item.sent = true;
          }
        });
      } else if (newStatus === "02-START") {
        startTimer();
      }
    });

    onMounted(() => {
      if (appState.status === "02-START") {
        startTimer();
      }
    });

    return {
      route: 'game1_main',
      items,
      showOverlay,
      selectedImage,
      navigateToPage,
      sendMsg,
      showImage,
      startTimer,
      keyPhoto
    };
  },

  methods: {
    flipListener(e) {
      console.log(page);
    },
    navigateToPage(routeName) {
      this.$router.push({ name: routeName });
    }
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
