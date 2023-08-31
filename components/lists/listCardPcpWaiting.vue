<template>
  <div v-if="$fetchState.pending">
    <Loading />
  </div>
  <div v-else>
    <section class="header">
      <select v-model="selected" class="filterStatus" @click="filter">
        <option value="">Todos</option>
        <option value="Novo">Novos TryOuts</option>
        <option value="Novo Produto">Novo Produto</option>
        <option value="Modificação de Molde">Mod. de Molde</option>
        <option value="Retroativo">Retroativo</option>
      </select>
    </section>
    <CardPcp
      v-for="(mold, id) in itemsToShow"
      :key="id"
      :dataMold="mold"
      :description="mold.solicitation.reason.description"
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
.header {
  width: 100%;
  display: flex;
  justify-content: flex-end;

  .filterStatus {
    width: 11rem;
    height: 2.5rem;
    margin-bottom: 10px;
    padding: 0.5rem;
  }
}
select {
  background-image: linear-gradient(120deg, green 50%, transparent 56%),
    linear-gradient(60deg, transparent 50%, green 56%),
    linear-gradient(to right, #ccc, #ccc);
  background-position: calc(100% - 15px) 1em, calc(100% - 20px) 1em,
    calc(100% - 2.5em) 0.5em;
  background-size: 6px 6px, 6px 6px, 1px 1.5em;
  background-repeat: no-repeat;
  border-color: #868686;
  outline: 0;

  /* styling */
  background-color: white;
  border-radius: 4px;
  display: inline-block;
  font: inherit;
  line-height: 1em;
  padding: 0.5em 3.5em 0.5em 1em;

  /* reset */
  margin: 0;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;
}
select.filterStatus:focus {
  background-image: linear-gradient(45deg, green 50%, transparent 50%),
    linear-gradient(135deg, transparent 50%, green 50%),
    linear-gradient(to right, #ccc, #ccc);
  background-position: calc(100% - 15px) 1em, calc(100% - 20px) 1em,
    calc(100% - 2.5em) 0.5em;
  background-size: 5px 5px, 5px 5px, 1px 1.5em;
  background-repeat: no-repeat;
  border-color: green;
  outline: 0;
}

select:-moz-focusring {
  color: transparent;
  text-shadow: 0 0 0 #000;
}
</style>
