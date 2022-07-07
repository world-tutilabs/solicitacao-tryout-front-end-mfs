<template>

  <div v-if="$fetchState.pending">
    <Loading />
  </div>
  <div v-else>
    <CardModel v-for="mold in listPaginated" :key="mold.id" :dataMold="mold"/>

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
    }
  },

  async fetch() {
    await httpLocal.listAllHistoric().then((res) => {
      this.listHistoric = res.data
    })
  }

}
</script>

<style>
</style>