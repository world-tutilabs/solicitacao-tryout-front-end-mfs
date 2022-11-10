<template>

  <div v-if="$fetchState.pending">
    <Loading />
  </div>
  <div v-else>
    <CardModel v-for="mold in listPaginated" :key="mold.id" :dataMold="mold" @updateList='updateList' />

    <Pagination :list="listHistoric" @displayNewList="displayNewList" />
  </div>
</template>

<script>
import httpLocal from '../../services/newMold/mold'
import Pagination from '../Pagination.vue'

export default {
  components: { Pagination },

  data() {
    return {

      listPaginated: [],
      listHistoric: []
    }
  },

  methods: {
    async displayNewList(e) {

      await httpLocal.listAllHistoric(e.page, 10).then(async (res) => {
        this.listPaginated  = res.data
        this.listHistoric = res.data
      })

    },

    updateList: async function () {
      this.$fetchState.pending = true
      setTimeout(() => {
        this.$fetchState.pending = false
      }, 1000);

      this.generateList()

    },

    generateList: async function () {


    },
  },

  async fetch() {
    await httpLocal.listAllHistoric().then(async (res) => {
        this.listHistoric = res.data

      })


  }

}
</script>

<style>
</style>
