<template>
  <div v-if="$fetchState.pending">
    <Loading />
  </div>
  <div v-else>
    <InputSearch v-model="valueSearch" class="InputSearch" />
    <div v-if="valueSearch.length < 1">
      <CardHistorico v-for="mold in listSearch" :key="mold.id" :dataMold="mold"/>
    </div>
    <div v-else>
      <CardHistorico v-for="mold in filterSearchField" :key="mold.id"
        :dataMold="mold"
        @updateList="updateList"/>
    </div>
    <Pagination
      v-if="listSearch.length > 0"
      :list="listSearch"
      @displayNewList="displayNewList"
    />
  </div>
</template>

<script>
import httpLocal from "../../services/newMold/mold";
import Pagination from "../Pagination.vue";

export default {
  components: { Pagination },

  data() {
    return {
      currentPage: 0,
      listHistoric: [],
      valueSearch: "",
      listSearch: [],
    };
  },
  async mounted() {
    await httpLocal.listAllHistoric(0, 10000).then((res) => {
      this.listSearch = res.data;
      console.log(this.listSearch);
    });
  },
  computed: {
    filterSearchField() {
      this.valueSearch = this.valueSearch.toLowerCase();
      let allContent = this.listSearch.filter((filter) => {
        return (
          filter.client.toLowerCase().match(this.valueSearch) ||
          filter.injectionProcess.mold.desc_mold
            .toLowerCase()
            .match(this.valueSearch) ||
          String(filter.number_tryout).toLowerCase().match(this.valueSearch)
        );
      });
      return allContent;
    },
  },
  methods: {
    // endpoint que esta populando a tabela
    async listAllHistoricReq() {
      await httpLocal
        .listAllHistoric(this.currentPage, 10)
        .then(async (res) => {
          this.listHistoric = res.data;
        });
    },
    displayNewList(e) {
      this.listSearch = e;
    },
  },

  async fetch() {
    await this.listAllHistoricReq();
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
