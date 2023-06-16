<template>
  <div v-if="$fetchState.pending">
    <Loading />
  </div>
  <div v-else>
    <CardModel v-for="mold in listHistoric" :key="mold.id" :dataMold="mold" />

    <button @click="init()" class="btn-pagination" v-if="currentPage !== 0">Inicio</button>
    <button @click="back()" class="btn-pagination" v-if="currentPage !== 0">Voltar</button>
    <button @click="next()" class="btn-pagination" v-if="listHistoric.length !== 0">Proximo</button>

  </div>
</template>

<script>
import http from '../../services/newMold/mold'
export default {

  data() {
    return {
      listHistoric: [],
      currentPage: 0
    }
  },
  methods: {
    async listAllHistoricReq() {
      await http.listAllAproveds(this.currentPage, 10, 1).then( (res) => {
        this.listHistoric = res.data.list
      })
      
    },

    async init () {
      this.currentPage = 0
      await this.listAllHistoricReq()
    },

    async next() {
      this.currentPage +=10
      await this.listAllHistoricReq()
    },

    async back() {
      this.currentPage -=10
      await this.listAllHistoricReq()
    }


  },

  async fetch() {
    await this.listAllHistoricReq()
  }
}
</script>

<style lang="scss" scoped>
.btn-pagination {
  border: none;
  cursor: pointer;
  margin: 0.1rem;
  height: 2rem;
  padding: 0.4rem;
  border-radius: 0.25rem;
  background-color: var(--green);
  color: #fff;
}
</style>
