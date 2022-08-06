import Vue from 'vue'
import Vuex from 'vuex'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    walletAddress: "",
    wtmContract: null,
  },
  getters: {
    walletAddress: state => state.walletAddress,
    wtmContract: state => state.walletAddress,
  },
  mutations: {
    setWalletAddress: (state, walletAddress) => (state.walletAddress = walletAddress),
  },
  actions: {
    async connectToBlockchain({ commit }) {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);  
      console.log(provider);
  
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      commit('setWalletAddress', address);
    }
  },
  modules: {
  }
})
