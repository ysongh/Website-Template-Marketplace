<template>
  <v-container>
    <div class="d-flex justify-space-between align-center mb-4">
      <h1>List of Website Templates</h1>
      <v-btn
        class="mb-3 float-left"
        color="orange"
        elevation="2"
        @click="goToFormPage()"
      >
        Add Template
      </v-btn>
    </div>
    
    <v-row>
      <v-col
        sm="12"
        md="4"
      >
        <v-card
          class="pa-2"
          outlined
          tile
        >
          <v-img
            height="250"
            src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
          ></v-img>
          <v-card-actions>
            <v-btn
              color="deep-purple lighten-2"
              block
            >
              Reserve
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col
        sm="12"
        md="4"
      >
        <v-card
          class="pa-2"
          outlined
          tile
        >
          <v-img
            height="250"
            src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
          ></v-img>
          <v-card-actions>
            <v-btn
              color="deep-purple lighten-2"
              block
            >
              Reserve
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col
        sm="12"
        md="4"
      >
        <v-card
          class="pa-2"
          outlined
          tile
        >
          <v-img
            height="250"
            src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
          ></v-img>
          <v-card-actions>
            <v-btn
              color="deep-purple lighten-2"
              block
            >
              Reserve
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'Home',
  methods: {
    goToFormPage() {
      this.$router.push('/add-template')
    },
  }
}
</script>
