<template>
  <div v-if="$fetchState.pending">
    <Loading />
  </div>

  <div v-else>

    <InputSearch v-model="valueSearch" class="InputSearch" />
    <CardNewModel  v-for="mold in filterSearchField" :key="mold.id" :dataMold="mold" />
    <button @click="init()" class="btn-pagination" v-if="currentPage !== 0">
      Inicio
    </button>
    <button @click="back()" class="btn-pagination" v-if="currentPage !== 0">
      Voltar
    </button>
    <button @click="next()" class="btn-pagination">Proximo</button>
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
    };
  },

  computed: {
    filterSearchField () {
      let allContent = this.newMolds.filter((filter) => {
        return (
        filter.CLIENTE.match(this.valueSearch)||
        filter.CLIENTE.toLowerCase().match(this.valueSearch)||
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
