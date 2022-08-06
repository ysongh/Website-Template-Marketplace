<template>
  <v-app-bar
    app
    color="primary"
    dark
  >
    <router-link :to="{ path: '/'}" class="nav-link">
      <p>Website Template Marketplace</p>
    </router-link>

    <router-link :to="{ path: '/'}" class="nav-link">
      Home
    </router-link>

    <v-spacer></v-spacer>

    <v-btn
      @click="connectToBlockchain()"
    >
      <span class="mr-2">{{ formatWalletAddress(walletAddress) }}</span>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: "Navbar",
  computed: mapGetters(['walletAddress']),
  methods: {
    ...mapActions(['connectToBlockchain']),
    formatWalletAddress(address) {
      if(address) return address.substring(0,8) + "..." + address.substring(34,42);
      else return "Connect Wallet"
    }
  }
}
</script>

<style>
  .nav-link {
    text-decoration: none;
    font-size: 1.2rem;
    margin-left: 1rem;
    margin-right: 1rem;
    color: #fff !important;
  }
  
  .nav-link:hover {
     color: rgb(184, 193, 203) !important;
  }
</style>