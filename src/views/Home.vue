<template>
  <div class="home">
    <v-btn
      color="orange"
      elevation="2"
      @click="goToFormPage()"
    >
      Post Contract
    </v-btn>
  </div>
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
