<template>
  <div v-if="$fetchState.pending">
    <Loading />
  </div>
  <div v-else>
    <CardPcp v-for="mold in listPcpWaiting" :key="mold.id" :dataMold="mold" />

    <button @click="init()" class="btn-pagination" v-if="currentPage !== 0">Inicio</button>
    <button @click="back()" class="btn-pagination" v-if="currentPage !== 0">Voltar</button>
    <button @click="next()" class="btn-pagination" v-if="listPcpWaiting.length !== 0">Proximo</button>


    <h3 v-if="listPcpWaiting.length === 0" style="margin-top: 3rem;">Não há novas solicitações...</h3>

  </div>
</template>

<script>
import http from '../../services/pcp/pcp'
import CardPcp from '../Cards/CardPcp.vue'
import Loading from '../Loading.vue'


export default {
  components: { CardPcp, Loading },
  data() {
    return {
      listPcpWaiting: [],
      currentPage: 0,
    }
  },
  methods: {
    async listAllPcpReq() {
      await http.listAllPcp(this.currentPage, 10).then((res) => {
        this.listPcpWaiting = res.data
      })
    },

    async init() {
      this.currentPage = 0
      await this.listAllPcpReq()
    },

    async next() {
      this.currentPage += 10
      await this.listAllPcpReq()
    },

    async back() {
      this.currentPage -= 10
      await this.listAllPcpReq()
    }

  },

  async fetch() {
    await this.listAllPcpReq()
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
