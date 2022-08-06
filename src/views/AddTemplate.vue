<template>
  <v-container>
    <v-card
      class="mx-auto my-5 pt-3"
      elevation="2"
      max-width="800"
    >
      <v-card-text>
        <h1>Add Your Website Template</h1>
        
        <form class="mt-4">
          <v-text-field
            v-model="title"
            label="Title"
            outlined
            dense
            clearable
          ></v-text-field>

          <input
            type="file"
            label="Upload Image"
            outlined
            dense
            prepend-icon="mdi-camera"
            @change="previewFiles">

          <v-textarea
            solo
            class="mb-0"
            rows="3"
            label="Description"
            v-model="description"
          ></v-textarea>

          <v-textarea
            solo
            class="mb-0"
            rows="10"
            label="Code"
            v-model="code"
          ></v-textarea>

          <v-btn
            v-if="!loading"
            class="mb-4"
            @click="uploadToIPFS()"
            block
            color="primary"
            :disabled=isDisabled
          >
            Create
          </v-btn>

          <div class="text-center" v-else>
            <v-progress-circular
              indeterminate
              color="primary"
            ></v-progress-circular>
          </div>
        </form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { NFTStorage, File } from 'nft.storage'
import LitJsSdk from 'lit-js-sdk'

import { NFT_STORAGE_APIKEY } from '../config'

const client = new NFTStorage({ token: NFT_STORAGE_APIKEY })

export default {
  name: "AddTemplate",
  data: () => ({
    loading: false,
    title: "",
    description: "",
    code: "",
    file: null,
  }),
  computed: {
    isDisabled() {
      return !this.title || !this.description || !this.code;
    },
  },
  methods: {
    previewFiles(event) {
      this.file = event.target.files
    },
    async uploadToIPFS() {
      try{
        const chain = 'mumbai'
        const authSig = await LitJsSdk.checkAndSignAuthMessage({chain})
        const accessControlConditions = [
          {
            contractAddress: '',
            standardContractType: '',
            chain: 'mumbai',
            method: 'eth_getBalance',
            parameters: [':userAddress', 'latest'],
            returnValueTest: {
              comparator: '>=',
              value: '0',  // 0 ETH, so anyone can open
            },
          },
        ];

        const { encryptedFile, symmetricKey } = await LitJsSdk.encryptFile({ file: this.file[0] })
        console.warn("symmetricKey:", symmetricKey)

        const encryptedSymmetricKey = await window.litNodeClient.saveEncryptionKey({
          accessControlConditions,
          symmetricKey,
          authSig,
          chain
        });

        console.warn("encryptedSymmetricKey:", encryptedSymmetricKey)
        console.warn("encryptedFile:", encryptedFile)

        const toDecrypt = LitJsSdk.uint8arrayToString(encryptedSymmetricKey, 'base16')
        console.log("toDecrypt:", toDecrypt);

        const _symmetricKey = await window.litNodeClient.getEncryptionKey({
          accessControlConditions,
          toDecrypt,
          chain,
          authSig
        })

        console.warn("_symmetricKey:", _symmetricKey);

        const decryptedFile = await LitJsSdk.decryptFile({
          file: encryptedFile,
          symmetricKey
        });

        console.warn("decryptedFile:", decryptedFile)

        const imageblob = new Blob([decryptedFile]);
        console.warn(imageblob)

        // const prepareToUpload = new File(
        // [JSON.stringify(
        //   {
        //     title: this.title,
        //     description: this.description,
        //     code: this.code
        //   },
        //   null,
        //   2
        // )], 'metadata.json')

        // const cid = await client.storeDirectory([prepareToUpload])
        // console.log(cid)
        this.$router.push('/')
      } catch(error) {
        console.log(error)
        this.loading = false
      }
    }
  }
}
</script>

<style>
  .flexRow {
    display: flex !important;
  }

  .v-input--selection-controls {
    margin-top: 5px;
    margin-left: 7px;
  }
</style>