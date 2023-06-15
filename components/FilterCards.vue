<template>
  <div v-if="$fetchState.pending">
    <Loading />
  </div>
  <div class="container" v-else>
    <div v-if="!routePcp" class="containerCard" >
    <NuxtLink to="/" class="cards">
      <span>Solicitações de</span>
      <h3>Novos Moldes</h3>

      <h5> 5 </h5>
    </NuxtLink>

    <NuxtLink to="/modifications" class="cards">
      <span>Solicitações de</span>
      <h3>Modificação de Molde</h3>
      <h5>5</h5>
    </NuxtLink>
</div>
<div class="containerCard" v-if="routePcp" >     
    <NuxtLink
      
      :to="`/${filterPcp.router}`"
      v-for="filterPcp in filtersPcp"
      :key="filterPcp.name"
      :class="{ cards: true }"
    >
      <span>{{ filterPcp.topName }}</span>
      <h3>{{ filterPcp.name }}</h3>
      <h5>{{ filterPcp.count }}</h5>
    </NuxtLink>
    </div>

  </div>
</template>

<script>
import httpNewMold from "../services/newMold/mold";
import http from "../services/pcp/pcp";

export default {
  data() {
    return {
      countTeste: 0,
      listAllApproveds: [],
      listHistoric: [],
      countHistoric: 0,
      counter: 0,
      filters: [
        { topName: "Novos",
          name: "Moldes", 
          count: "", 
          router: "" },
        {
          topName: "Modificação de",
          name: "Molde",
          count: "000",
          router: "",
        },
      ],
      filtersPcp: [
        {
          topName: "Solicitações",
          name: "Espera",
          count: "000",
          router: "pcp/waiting",
        },
        {
          topName: "Solicitações",
          name: "Aprovados",
          count: "000",
          router: "pcp/approveds",
        },
      ],
    };
  },

  watch: {
    countTeste: async function (newValue) {
      this.filters[0].count = newValue;
    },
  },

  async fetch() {
    if (this.$nuxt.$route.path === "/") {
      await httpNewMold.listAllRRIM(0, 10000).then((res) => {
        this.filters[0].count = res.data.length;
        console.log(this.filters);
      });
    } else {
      await httpNewMold.listAllHistoric(0, 10000).then((res) => {
        res.data.map((item) => {
          if (item.homologation.status.id === 1) {
            this.countHistoric = this.countHistoric + 1;
          }
        });
        this.filtersPcp[1].count = this.countHistoric;
      });

      await http.listAllPcp().then((res) => {
        this.filtersPcp[0].count = res.data.length;
      });
    }
  },
  methods: {
    greet: function (event) {
      if (event) {
        this.$toast.warning("Funcionalidade em Desenvolvimento");
      }
    },
  },
  computed: {
    routePcp() {
      if (
        this.$route.name === "pcp-waiting" ||
        this.$route.name === "pcp-approveds"
      ) {
        return true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
  padding: 5vh var(--negativeSpace) 0 var(--negativeSpace);
  .containerCard{
    display: flex;
    gap: 1rem;
    overflow-y: none;
    width: 100%;

    a.nuxt-link-exact-active {
    border: 2.9px solid var(--green);
  }

    .cards {
    grid-gap: .4rem;
    background: var(--white);
    border: 1px solid var(--gray);
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    height: 100%;
    justify-content: center;
    max-height: 6rem;
    padding: max(.3rem,1vw);
    transition: .1s;
    width: 300px;

    span {
      font-weight: 500;
    }

    h3 {
      font-size: 1rem;
    }

  }
  }

 
  @media (max-width: 768px) {
    width: 100%;
    overflow-x: auto;
  }
}

.container::-webkit-scrollbar {
  width: 5px;
  height: 10px;
}

.container::-webkit-scrollbar-thumb {
  background: var(--gray);
  border-radius: 2px;
}

.container::-webkit-scrollbar-thumb:hover {
  background: var(--gray_text);
}
</style>
