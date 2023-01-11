<template>
  <div v-if="$fetchState.pending">
    <Loading />
  </div>

  <div v-else>
    <InputSearch v-model="valueSearch" class="InputSearch" />

    <div v-if="valueSearch.length < 1">
      <CardNewModel  v-for="mold in newMolds" :key="mold.id" :dataMold="mold" />
    </div>

    <div v-else>
      <CardNewModel  v-for="mold in filterSearchField" :key="mold.id" :dataMold="mold" />
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
import http from "~/services/newMold/mold";
import CardNewModel from "../Cards/CardNewModel.vue";
import Pagination from "../Pagination.vue";
import Loading from "../Loading.vue";

export default {
  components: { CardNewModel, Pagination, Loading },

  data() {
    return {
      newMolds: [],
      currentPage: 0,
      valueSearch: "",
      listSearch: []
    };
  },

  async mounted () {
    await http.listAllRRIM(0, 10000).then((res) => {
      this.listSearch = res.data
    })
  },

  computed: {
    filterSearchField () {

      this.valueSearch = this.valueSearch.toLowerCase()
      let allContent = this.listSearch.filter((filter) => {
        return (
        filter.CLIENTE.toLowerCase().match(this.valueSearch)||
        filter.MOLDE.toLowerCase().match(this.valueSearch)||
        String(filter.ID).toLowerCase().match(this.valueSearch)
        )
      })
    return allContent;
  
     },
       
  },
  methods: {
    async listAllRRIMReq() {
      await http.listAllRRIM(this.currentPage, 10).then((res) => {
        this.newMolds = res.data;
      })

    },
     
    async init() {
      this.currentPage = 0;
      await this.listAllRRIMReq();
    },
    async next() {
      this.currentPage += 10;
      await this.listAllRRIMReq();
    },
    async back() {
      this.currentPage -= 10;
      await this.listAllRRIMReq();
    },
  },

  async fetch() {
    await this.listAllRRIMReq();
  },
};
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
