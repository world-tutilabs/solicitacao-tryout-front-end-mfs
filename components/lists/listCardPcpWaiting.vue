<template>
  <div v-if="$fetchState.pending">
    <Loading />
  </div>
  <div v-else>
    <select v-model="selected" class="filterStatus" @click="filter">
      <option value="">Todos</option>
      <option value="Novo">Novos TryOuts</option>
      <option value="Novo Produto">Novo Produto</option>
      <option value="Modificação de Molde">Modificação de Molde</option>
      <option value="Retroativo">Retroativo</option>
    </select>
    
    <CardPcp
      v-for="(mold, id) in itemsToShow"
      :key="id"
      :dataMold="mold"
      :description="mold.solicitation.reason.description"
    />

    <Pagination
      v-if="listSearch.length > 0"
      :list="listSearch"
      @displayNewList="displayNewList"
      @nextPage="nextPage"
      @backPage="backPage"
    />
  </div>
</template>

<script>
import http from "../../services/pcp/pcp";
import CardPcp from "../Cards/CardPcp.vue";
import Loading from "../Loading.vue";

export default {
  components: { CardPcp, Loading },
  data() {
    return {
      listPcpWaiting: [],
      listSearch: [],
      currentPage: 0,
      status: "",
      selected: "",
      itemsFiltrados: [],
    };
  },
  async mounted() {
    await http.listAllPcp(this.currentPage, 10, 3).then((res) => {
      this.listSearch = res.data;
    });
  },
  methods: {
    async listAllPcpReq() {
      await http.listAllPcp(this.currentPage, 10, 3).then((res) => {
        this.listPcpWaiting = res.data;
      });
    },

    filter() {
      const filteredItems = this.listPcpWaiting.filter((item) => {
        return item.solicitation.reason.description === this.selected;
      });
      this.itemsFiltrados = filteredItems;
      console.log(this.listPcpWaiting);
    },
    async backPage() {
      this.currentPage -= 10;
      await this.listAllPcpReq();
    },

    async nextPage() {
      this.currentPage += 10;
      await this.listAllPcpReq();
    },
    displayNewList(e) {
      this.listPaginated = e;
    },
  },
  computed: {
    itemsToShow() {
      return this.selected === "" ? this.listPcpWaiting : this.itemsFiltrados;
    },
  },
  async fetch() {
    await this.listAllPcpReq();
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
.filterStatus {
  height: 3rem;
  margin-bottom: 10px;
  padding: 0.5rem;
}
</style>
