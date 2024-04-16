<template>
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
            <v-btn color="grey darken-1" text @click="dialog = false">Close</v-btn>
          </v-card-actions>
        </v-card>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      email: {
        to: 'recipient@example.com',
        subject: 'Upcoming Event',
        body: 'Hello, we are pleased to invite you to our upcoming event. Please let us know if you can attend. Best regards.'
      }
    };
  }
}
</script>
