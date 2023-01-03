<template>
  <div v-if="$fetchState.pending" >
    <Loading />
  </div>
  <div v-else>
    <CardPcp v-for="mold in listPcpWaiting" :key="mold.id" :dataMold="mold"/>
    <Pagination :tipoderouter="3" :list="listArray" @displayNewList="displayNewList" />
    <h2>a</h2>
  </div>
</template>

<script>
import http from '../../services/pcp/pcp'
import Pagination from '../Pagination.vue'

export default {
  components: { Pagination },
  data() {
    return {
      listPcpWaiting: [],
      listArray: []
    }
  },
  methods: {
    async displayNewList(e) {
      await http.listAllPcp(e.page, 10).then((res) => {
        const list = res.data
        list.map((item) => {
          this.listArray.push(item)
        })
      })
    },


  },

  async fetch() {
    await http.listAllPcp().then( (res) => {
      this.listPcpWaiting = res.data
      const list = res.data
        list.map((item) => {
          this.listArray.push(item)
        })
    })

    console.log(this.listArray);
  }
}
</script>

<style>
</style>
