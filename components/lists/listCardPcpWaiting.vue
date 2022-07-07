<template>
  <div v-if="$fetchState.pending">
    <Loading />
  </div>
  <div v-else>
    <CardPcp v-for="mold in listPaginated" :key="mold.id" :dataMold="mold" />
    <Pagination :list="listPcpWaiting" @displayNewList="displayNewList" />
  </div>
</template>

<script>
import http from '../../services/pcp/pcp'

export default {
  data() {
    return {
      listPaginated: [],
      listPcpWaiting: [],
    }
  },
  methods: {
    displayNewList(e) {
      this.listPaginated = e
    },
  },

  async fetch() {
    await http.listAllPcp().then((res) => {
      console.log(res.data);
      this.listPcpWaiting = res.data
    })
  }
}
</script>

<style>
</style>