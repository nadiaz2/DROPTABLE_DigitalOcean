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
        <v-col v-for="(item, index) in filteredItems" :key="index" cols="4" class="no-padding">
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
import { inject, onMounted, computed, ref, watch } from 'vue';
import connection from "@/plugins/connection"; // Ensure this is the correct path
import skirt from '@/assets/Album/Skirt.png';
import ins from '@/assets/Album/ins.png';
import p0 from '@/assets/Album/p.png';
import p1 from '@/assets/Album/p1.jpg';
import p2 from '@/assets/Album/p2.jpg';
import p3 from '@/assets/Album/p3.jpg';
import p4 from '@/assets/Album/p4.jpg';
import p5 from '@/assets/Album/p5.jpg';
import p6 from '@/assets/Album/p6.png';
import p7 from '@/assets/Album/p7.jpg';
import p8 from '@/assets/Album/p8.jpg';
import c0 from '@/assets/Album/c0.jpg';
import c1 from '@/assets/Album/c1.png';
import c2 from '@/assets/Album/c2.png';
import c3 from '@/assets/Album/c3.png';
import c4 from '@/assets/Album/c4.png';
import c5 from '@/assets/Album/c5.jpg';

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
        image: p0,
        sent: false,
      },
      {
        Message: "",
        image: "https://cdn.photoswipe.com/photoswipe-demo-images/photos/1/img-2500.jpg",
        sent: true,
      },
      {
        Message: "",
        image: ins,
        sent: false,
      },
      {
        Message: "",
        image: p1,
        sent: false,
      },
      {
        Message: "",
        image: p2,
        sent: false,
      },
      {
        Message: "",
        image: p3,
        sent: false,
      },
      {
        Message: "",
        image: p4,
        sent: false,
      },
      {
        Message: "",
        image: p5,
        sent: false,
      },
      {
        Message: "01-FOUNDPHOTO",
        image: skirt,
        sent: false,
      },
      {
        Message: "",
        image: c0,
        sent: false,
      },
      {
        Message: "",
        image: c1,
        sent: false,
      },
      {
        Message: "",
        image: c2,
        sent: false,
      },
      {
        Message: "",
        image: c3,
        sent: false,
      },
      {
        Message: "",
        image: c4,
        sent: false,
      },
      {
        Message: "",
        image: c5,
        sent: false,
      },
      {
        Message: "",
        image: p6,
        sent: false,
      },
      {
        Message: "",
        image: p7,
        sent: false,
      },
      {
        Message: "",
        image: c4,
        sent: false,
      },
      {
        Message: "",
        image: p8,
        sent: false,
      },
      // Add more items as needed
    ]);

    const filteredItems = computed(() => {
      return items.filter((item) => {
        return (appState.status === '01-START') || (item.image !== skirt)
      })
    })

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
      if (newStatus === "01-FINISH") {
        keyPhoto.visibility = "invisible";
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
      filteredItems,
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
