<template>
  <div v-if="$fetchState.pending">
    <Loading />
  </div>

  <div v-else>
    <InputSearch v-model="valueSearch" class="InputSearch" />
    <div v-if="valueSearch.length < 1">
      <CardNewModel
        v-for="mold in listSearch"
        :key="mold.id"
        :dataMold="mold"
      />
    </div>

    <div v-else>
      <CardNewModel
        v-for="mold in filterSearchField"
        :key="mold.id"
        :dataMold="mold"
      />
    </div>
    <Pagination
      v-if="listSearch.length > 0"
      :list="listSearch"
      @displayNewList="displayNewList"
    />
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
      listSearch: [],
      countPage: "",
      listPaginated: [],
    };
  },

  async mounted() {
    await http.listAllRRIM(0, 10000, 2).then((res) => {
      this.countPage = res.data.countTotal;
    });

    // lista que passa para componente pagination para calcular a qtd pages
    await http.listAllRRIM(0, this.countPage, 2).then((res) => {
      this.listSearch = res.data.list;
    });
  },

  computed: {
    filterSearchField() {
      this.valueSearch = this.valueSearch.toLowerCase();
      let allContent = this.listSearch.filter((filter) => {
        return (
          filter.CLIENTE.toLowerCase().match(this.valueSearch) ||
          filter.MOLDE.toLowerCase().match(this.valueSearch) ||
          String(filter.ID).toLowerCase().match(this.valueSearch)
        );
      });
      return allContent;
    },
  },
  methods: {
    // endpoint que esta populando a tabela
    async listAllRRIMReq() {
      await http.listAllRRIM(this.currentPage, 10, 2).then((res) => {
        this.newMolds = res.data.list;
      });
    },
    displayNewList(e) {
      this.listSearch = e;
    },
  },

  async fetch() {
    await this.listAllRRIMReq();
    // await http.listAll().then((res) => {
    //   console.log(res.data);
    // });
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
