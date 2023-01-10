<template>

  <div v-if="$fetchState.pending">
    <Loading />
  </div>
  <div v-else>
    <InputSearch v-model="valueSearch" class="InputSearch" />

    <div v-if="valueSearch.length < 1">
      <CardModel v-for="mold in listHistoric" :key="mold.id" :dataMold="mold" @updateList='updateList' />
    </div>
    <div v-else>
      <CardModel v-for="mold in filterSearchField" :key="mold.id" :dataMold="mold" @updateList='updateList' />
    </div>
    

    <div v-if="valueSearch.length < 1">
      <button @click="init()" class="btn-pagination" v-if="currentPage !== 0">
      Inicio
    </button>
    <button @click="back()" class="btn-pagination" v-if="currentPage !== 0">
      Voltar
    </button>
    <button @click="next()" class="btn-pagination">Proximo</button>
    </div>
  </div>
</template>

<script>
import httpLocal from '../../services/newMold/mold'
import Pagination from '../Pagination.vue'

export default {
  components: { Pagination },

  data() {
    return {

      currentPage: 0,
      listHistoric: [],
      valueSearch: "",
      listSearch: []
    }
  },
  async mounted () {
    await httpLocal.listAllHistoric(0, 10000).then((res) => {
      this.listSearch = res.data
    })
  },
  computed: {
    filterSearchField () {
      let allContent = this.listSearch.filter((filter) => {
        return (
        filter.client.match(this.valueSearch)||
        filter.client.toLowerCase().match(this.valueSearch)||
        String(filter.number_tryout).toLowerCase().match(this.valueSearch)
        
        )
      })
    return allContent;
  
     },
       
  },
  methods: {
    async listAllHistoricReq () {
      await httpLocal.listAllHistoric(this.currentPage, 10).then(async (res) => {
        this.listHistoric = res.data

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
