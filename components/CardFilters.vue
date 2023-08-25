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
        { topName: "Novos",
          name: "Moldes",
          count: "Aguardando Dados...", 
          router: "/" 
        },
        {
          topName: "Solicitações de",
          name: "Modificações",
          count: "Aguardando Dados...",
          router: "/sol-modificacao",
        }
      ],
      filtersPcp: [
        {
          topName: "Solicitações",
          name: "Espera",
          count: "Aguardando Dados...",
          router: "waiting",
        },
        {
          topName: "Solicitações",
          name: "Aprovados",
          count: "Aguardando Dados...",
          router: "approveds",
        },
        {
          topName: "Solicitações",
          name: "Concluidas",
          count: "Aguardando Dados...",
          router: "completed",
        },
      ],
    };
  },
};
</script>
