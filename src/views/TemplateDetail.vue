<template>
   <v-container>
    <v-row>
      <v-col>
        <v-card class="mb-2">
          <v-card-text class="template-card font-weight-bold">
            <h2 class="mb-2">{{ ipfsData.title }}</h2>
            <p>{{ ipfsData.description }}</p>
            <p>Price: 1 MATIC</p>
          </v-card-text>
          <v-card-actions>
            <v-btn
              v-if="template.isBrought"
              color="orange"
            >
              Download Code
            </v-btn>
            <v-btn
              v-else
              color="orange"
              @click="purchase()"
            >
              Purchase and Mint
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
        <v-col
      >
        <img src="https://images.unsplash.com/photo-1573867639040-6dd25fa5f597?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHdlYnNpdGV8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60" alt="Webiste" class="website-image">
      </v-col>
    </v-row>
   </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: "TemplateDetail",
  data: () => ({
    template: {},
    ipfsData: {}
  }),
  computed: mapGetters(['wtmContract']),
  methods: {
    async purchase() {
      const transaction = await this.wtmContract.mintTemplate(this.$route.params.id);
      const tx = await transaction.wait();
      console.log(tx);

      const template = await this.wtmContract.listOfTemplate(this.$route.params.id)
      this.template = template
    }
  },
  async created() {
    const template = await this.wtmContract.listOfTemplate(this.$route.params.id)
    this.template = template

    let data = await fetch(`https://${template.cid}.ipfs.nftstorage.link/metadata.json`)
    data = await data.json()
    console.log(data)
    
    this.ipfsData = data
    console.log(this.template)
  }
}
</script>

<style>
  .template-card {
    height: 250px;
  }
  .website-image {
    width: 100%;
    height: 300px;
  }
</style>