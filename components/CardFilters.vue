<template>
  <FilterCards :filters="filters" :filtersPcp="filtersPcp" />
</template>

<script>
import FilterCards from "./FilterCards.vue";

export default {
  components: { FilterCards },
  data() {
    return {
      filters: [
        { topName: "Novos", name: "Moldes", count: "", router: "/" },
        {
          topName: "Solicitações de",
          name: "Modificações",
          count: "000",
          router: "/modifications",
        },
        {
          topName: "Solicitações testes de",
          name: "Resina",
          count: "000",
          router: "/resin-test",
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
};
</script>
