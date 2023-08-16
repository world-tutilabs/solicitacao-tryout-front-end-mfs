<template>
  <div v-if="$fetchState.pending">
    <Loading />
  </div>
  <div v-else>
    <CardModal v-for="mold in listSearch" :key="mold.id" :dataMold="mold" />
    <Pagination
      :list="listSearch"
      @displayNewList="displayNewList"
    />
  </div>
</template>

<script>
import http from "../../services/newMold/mold";
export default {
  data() {
    return {
      listHistoric: [],
      listSearch: [],
      currentPage: 0,
    };
  },
  async mounted() {
    await http.listAllAproveds(this.currentPage, 1000, 5).then((res) => {
      this.listSearch = res.data.list;
    });
  },
  methods: {
    async listAllHistoricReq() {
      await http.listAllAproveds(this.currentPage, 10, 5).then((res) => {
        this.listHistoric = res.data.list;
      });

    },

    displayNewList(e) {
      this.listSearch = e;
    },

    async nextPage() {
      this.currentPage += 10;
      await this.listAllHistoricReq();
    },

    async backPage() {
      this.currentPage -= 10;
      await this.listAllHistoricReq();
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
