<template>
  <FilterCards :filters="filters" :filtersPcp="filtersPcp" />
</template>

<script>
import FilterCards from "./FilterCards.vue";
// import http from "~/services/fit/index";
// import httpTryOut from "~/services/reportTryOut/index";

export default {
  components: { FilterCards },
  data() {
    return {
      filters: [
        { topName: "Novos", name: "Moldes", count: "", router: "" },
        {
          topName: "Solicitações de",
          name: "Modificações",
          count: "000",
          router: "/modidificacoes",
        },
        {
          topName: "Solicitações testes de",
          name: "Resina",
          count: "000",
          router: "/resina",
        },
      ],
      filtersPcp: [
        {
          topName: "Solicitações",
          name: "Espera",
          count: "000",
          router: "waiting",
        },
        {
          topName: "Solicitações",
          name: "Aprovados",
          count: "000",
          router: "approveds",
        },
        {
          topName: "Solicitações",
          name: "Concluidas",
          count: "000",
          router: "completed",
        },
      ],
    };
  },

  // async created () {
  //   await this.loadCountData()
  // },

  // watch: {
  //   '$store.state.cardListController' () {
  //     this.$nuxt.refresh()
  //      this.loadCountData()

  //   }
  // },

  // methods: {
  //   async loadCountData () {
  //     await http.ApprovedList().then((res) => {
  //       this.filters[1].count = res.data.length
  //     })
  //     await http.HomologatedList().then((res) => {
  //       this.filters[2].count = res.data.length
  //     })

  //     await httpTryOut.ListAllReports().then((res) => {
  //       this.filters[0].count = res.data.body.length
  //     })
  //   }
  // }
};
</script>
