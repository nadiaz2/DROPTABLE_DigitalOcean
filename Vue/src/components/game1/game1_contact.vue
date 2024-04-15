<template>
    <v-app>
      <v-toolbar color="cyan-lighten-1">
        <v-btn variant="text" icon="mdi-arrow-left" @click="navigateToPage(route)"></v-btn>
        <v-toolbar-title>Inbox</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn variant="text" icon="mdi-magnify"></v-btn>
      </v-toolbar>
  
      <v-list>
        <template v-for="(item, index) in items" :key="index">
          <v-divider v-if="item.type === 'divider'" :inset="item.inset"></v-divider>
          <v-list-item v-else @click="selectContact(item)">
            <v-list-item-content>
              <v-list-item-title v-html="item.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
  
      <v-dialog v-model="dialogVisible" max-width="600px">
        <v-card elevation="7" style="height: 500px">
          <v-card-title class="justify-center">
            <v-row justify="center" class="avatar">
              <v-avatar size="160px">
                <v-img :src="currentContact.avatar"></v-img>
              </v-avatar>
            </v-row>
          </v-card-title>
  
          <v-card-subtitle class="text-center">
            <br />
            <h1 style="font-size: 40px; color: black">{{ currentContact.name }}</h1>
            <br />
            <p style="font-size: 20px; color: black">{{ currentContact.phone }}</p>
          </v-card-subtitle>
  
          <v-card-text>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Address</v-list-item-title>
                <v-list-item-subtitle>{{ currentContact.address }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Email</v-list-item-title>
                <v-list-item-subtitle>{{ currentContact.email }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Birthday</v-list-item-title>
                <v-list-item-subtitle>{{ formatDate(currentContact.birthday) }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-app>
  </template>
  

<script>
import router from "@/router";
import Emily from '@/assets/Contact/Emily.png';
import Jacob from '@/assets/Contact/Jacob.png';
import Morgan from '@/assets/Contact/Morgan.png';
import Rachael from '@/assets/Contact/Rachael.png';
import Tom from '@/assets/Contact/Tom.png';



export default {
  name: "game1main",
  data() {
    return {
      dialogVisible: false,
      route: "game1_main",
      currentContact: {}, // Initialize as null or with default empty contact structure

      items: [
        {
          title: "Emily",
          avatar: Emily,
          phone: "555-1234",
          email: "alice@example.com",
          address: "123 Alice Lane, Wonderland, WO",
          birthday: "1985-04-01",
          route: "contact_alice",
        },
        { type: "divider", inset: true },
        {
          title: "Tom",
          avatar: Tom,
          phone: "555-5678",
          email: "tom@example.com",
          address: "456 Tom Road, Tomtown, TT",
          birthday: "1990-08-15",
          route: "contact_tom",
        },
        { type: "divider", inset: true },
        {
          title: "Morgan",
          avatar: Morgan,
          phone: "555-9876",
          email: "morgn@example.com",
          address: "456 Tom Road, Tomtown, TT",
          birthday: "1990-08-15",
          route: "contact_tom",
        },
        { type: "divider", inset: true },
        {
          title: "Jacob",
          avatar: Jacob,
          phone: "555-9876",
          email: "jacob@example.com",
          address: "456 Tom Road, Tomtown, TT",
          birthday: "1990-08-15",
          route: "contact_tom",
        },
        { type: "divider", inset: true },
        {
          title: "Rachael",
          avatar: Rachael,
          phone: "555-9876",
          email: "jacob@example.com",
          address: "456 Tom Road, Tomtown, TT",
          birthday: "1990-08-15",
          route: "contact_tom",
        },
      ],
    };
  },
  methods: {
    flipListener(e) {
      console.log(page);
    },

    navigateToPage(routeName) {
      console.log("Navigating to:", routeName); // For debugging
      if (routeName) {
        this.$router.push({ name: routeName });
      }
    },

    testClick(items) {
      console.log("Item clicked:", items);
      // If this works, replace with navigateToPage(item.route)
    },
    formatDate(dateString) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
    selectContact(item) {
        this.currentContact = item; // Ensure currentContact is declared in data
        this.dialogVisible = true;
    },
  },
};
</script>

<style scoped>
.app-card {
  border-radius: 10px;
  height: 70px;
  width: 70px;
}

.app-card {
  margin: auto;
}

.custom-contacts {
  font-size: 100px !important;
}
.v-card-title {
  margin-top: 40px;
}
</style>
