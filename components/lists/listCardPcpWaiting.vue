<template>
  <div v-if="$fetchState.pending">
    <Loading />
  </div>
  <div v-else>
    <CardPcp v-for="mold in listPcpWaiting" :key="mold.id" :dataMold="mold" :description="mold.solicitation.reason.description"/>

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
    };
  },
  async mounted() {
    await http.listAllPcp(this.currentPage, 1000).then((res) => {
      this.listSearch = res.data;
    });
  },
  methods: {
    async listAllPcpReq() {
      await http.listAllPcp(this.currentPage, 10).then((res) => {
        this.listPcpWaiting = res.data;


      });
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
</style>
