<template>
  <div v-if="$fetchState.pending">
    <Loading />
  </div>
  <div v-else>
    <CardModel v-for="mold in listAllApproveds" :key="mold.id" :dataMold="mold" />
    <Pagination :tipoderouter="3" :list="listAllApproveds" @displayNewList="displayNewList" />
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

      await httpLocal.listAllHistoric(e.page, 10).then((res) => {

        this.listHistoric = res.data

        this.listHistoric.map((item) => {
          if (item.homologation.status.id === 1) {
            this.listPaginated.push(item)
          }
        })

      })
    },

  },

  async fetch() {
    await httpLocal.listAllHistoric(0, 10000).then((res) => {

      res.data.map((item) => {
        if (item.homologation.status.id === 1) {
          this.listHistoric.push(item)
        }
      })

      console.log(this.listHistoric);

    })
  }
}
</script>

<style>

</style>
