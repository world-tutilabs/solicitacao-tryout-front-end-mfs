<template>

  <div v-if="$fetchState.pending">
    <Loading />
  </div>
  <div v-else>
    <CardModel v-for="mold in listPaginated" :key="mold.id" :dataMold="mold" @updateList='updateList'/>

    <Pagination :list="listHistoric" @displayNewList="displayNewList" />
  </div>
</template>

<script>
import httpLocal from '../../services/newMold/mold'

export default {

  data() {
    return {

      listPaginated: [],
      listHistoric: []
    }
  },

  methods: {
    displayNewList(e) {
      this.listPaginated = e
    },

    updateList: async function() {
      this.$fetchState.pending = true
      setTimeout(() => {
        this.$fetchState.pending = false
      }, 1000);
      
      this.generateList()
      
      
      console.log("Entrou aqui");
    },

    generateList: async function () {
    await httpLocal.listAllHistoric().then( async (res) => {
      this.listHistoric = res.data

    })

  },
  },

  watch: {

     listHistoric(newValue){
      console.log(newValue.length);
       this.$store.commit('setCountNewMold', newValue.length)

    }
  },

  

  async fetch() {
    await this.generateList()
    

  }

}
</script>

<style>
</style>