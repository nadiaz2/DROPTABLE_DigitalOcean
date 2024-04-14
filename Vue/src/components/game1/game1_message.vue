<template>
    <v-app>
      <v-toolbar color="purple lighten-1">
        <v-btn icon @click="navigateToPage(route)">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title>Inbox</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-toolbar>
  
      <v-container>
        <v-list dense>
          <v-list-item
            v-for="item in items"
            :key="item.title"
            @click="console.log('Item clicked')">
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
              <v-list-item-subtitle>{{ item.subtitle }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-container>
    </v-app>
  </template>
  
  
  
<script setup>
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
        window.location.href = 'pause.html';
    }
}

function until(conditionFunction) {

    const poll = resolve => {
        if (conditionFunction()) resolve();
        else setTimeout(_ => poll(resolve), 100);
    }

    return new Promise(poll);

}

</script>
  
<script>
import connection from "@/plugins/connection";

export default {
    name: 'game1main',
    data() {
        return {
            route: 'game1_main',
            externalUrl: 'https://www.apple.com/',// Replace with your external URL,
            items: [
                { type: 'subheader', title: 'Today' },
                {
                    prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
                    title: 'Brunch this weekend?',
                    subtitle: `<span class="text-primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
                },
                { type: 'divider', inset: true },
                {
                    prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
                    title: 'Summer BBQ',
                    subtitle: `<span class="text-primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
                },
                { type: 'divider', inset: true },
                {
                    prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
                    title: 'Oui oui',
                    subtitle: '<span class="text-primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
                },
                { type: 'divider', inset: true },
                {
                    prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
                    title: 'Birthday gift',
                    subtitle: '<span class="text-primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
                },
                { type: 'divider', inset: true },
                {
                    prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
                    title: 'Recipe to try',
                    subtitle: '<span class="text-primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
                },
            ],
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


}
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
</style>
  