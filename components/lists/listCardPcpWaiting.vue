<template>
  <div v-if="$fetchState.pending" >
    <Loading />
  </div>
  <div v-else>
    <CardPcp v-for="mold in listPaginated" :key="mold.id" :dataMold="mold" @updateList='updateList'/>
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
    async displayNewList(e) {
      await http.listAllPcp().then((res) => {

     this.listPaginated  = res.data

      })
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
      await http.listAllPcp().then((res) => {

        this.listPcpWaiting = res.data
        console.log(this.listPcpWaiting);
    })
    }

  },

  async fetch() {
    await this.generateList()
  }
}
</script>

<style>
</style>
