<template>
  <div v-if="$fetchState.pending">
    <Loading />
  </div>
  <div v-else>
    <CardModel v-for="mold in listPaginated" :key="mold.id" :dataMold="mold"/>

    <Pagination :list="listAllApproveds" @displayNewList="displayNewList" />
  </div>
</template>

<script>
import httpLocal from '../../services/newMold/mold'
export default {

  data() {
    return {
      listPaginated: [],
      listHistoric: [],
      listAllApproveds: []
    }
  },
  methods: {
    async displayNewList(e) {

      await httpLocal.listAllHistoric().then((res) => {

      this.listHistoric = res.data

      this.listHistoric.map( (item) => {
        if(item.homologation.status.id === 1){
          this.listPaginated.push(item)
        }
      })

    })
    },


  },

  async fetch() {
    await httpLocal.listAllHistoric().then((res) => {

      this.listHistoric = res.data

      this.listHistoric.map( (item) => {
        if(item.homologation.status.id === 1){
          this.listAllApproveds.push(item)
        }
      })

    })
  }
}
</script>

<style>
</style>
