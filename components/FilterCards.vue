<template>
  <div v-if="$fetchState.pending">
    <Loading />
  </div>
  <div v-else>
    <div v-if="!routePcp">
      <div class="container">
        <NuxtLink
          v-for="filter in filters"
          :key="filter.name"
          :to="filter.router"
          :class="{ cards: true }"
        >
          <span>{{ filter.topName }}</span>
          <h2>
            {{ filter.name }}
          </h2>
          <h3>{{ filter.count }}</h3>
        </NuxtLink>
      </div>
    </div>
    <div v-if="routePcp">
      <div class="container">
        <NuxtLink
          v-for="filter in filtersPcp"
          :key="filter.name"
          :to="filter.router"
          :class="{ cards: true }"
        >
          <span>{{ filter.topName }}</span>
          <h2>
            {{ filter.name }}
          </h2>
          <h3>{{ filter.count }}</h3>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
import httpNewMold from "../services/newMold/mold";
import http from "../services/pcp/pcp";

export default {
  props: {
    filters: {
      type: [Array, Object],
      required: true,
    },
    filtersPcp: {
      type: [Array, Object],
      required: true,
    },
  },
  data() {
    return {
      countTeste: 0,
      listAllApproveds: [],
      listHistoric: [],
      countHistoric: 0,
      counter: 0,
      countMold: "",
    };
  },

  watch: {
    countTeste: async function (newValue) {
      this.filters[0].count = newValue;
    },
  },

  async fetch() {
    if (this.$nuxt.$route.path === "/") {
      await httpNewMold.listAllRRIM(0, 10000, 2).then((res) => {
        this.filters[0].count = res.data.countTotal;
      });
    } else {
      // await httpNewMold.listAllHistoric(0, 10000).then((res) => {
      //   res.data.map((item) => {
      //     if (item.homologation.status.id === 1) {
      //       this.countHistoric = this.countHistoric + 1;
      //     }
      //   });
      //   this.filtersPcp[1].count = this.countHistoric;
      // });

      // lista os que estao em revisao
      await httpNewMold.listAllAproveds(1000, 10, 3).then((res) => {
        this.filtersPcp[0].count = res.data.all;
      });

      // lista os que estao em aprovacao
      await httpNewMold.listAllAproveds(1000, 10, 1).then((res) => {
        this.filtersPcp[1].count = res.data.all;
      });

      // lista os que estao em concluido
      await httpNewMold.listAllAproveds(1000, 10, 5).then((res) => {
        this.filtersPcp[2].count = res.data.all;
      });
    }
  },
  methods: {
    greet(event) {
      if (event.name === "Modificações" || event.name === "Resina") {
        this.$toast.error("Funcionalidade em Desenvolvimento");
      }
      // if (event) {
      //   this.$toast.warning("Funcionalidade em Desenvolvimento");
      // }
    },
  },
  computed: {
    routePcp() {
      if (
        this.$route.name === "pcp-waiting" ||
        this.$route.name === "pcp-approveds" ||
        this.$route.name === "pcp-completed"
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
  gap: 1rem;
  overflow: hidden;
  padding: 2px;
  width: 100%;
  padding-bottom: 10px;

  a.nuxt-link-exact-active {
    border: 2.5px solid var(--green);
  }

  .cards {
    background: var(--white);
    border: 1px solid var(--gray_text_border);
    width: 300px;
    padding: max(0.3rem, 1vw);
    height: 100%;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.4rem;
    h2 {
      font-size: max(0.9rem, 1.3vw);
    }
    &:hover {
      background: var(--bg);
    }
    span {
      font-size: max(0.8rem, 0.8vw);
    }
    @media (max-width: 768px) {
      padding: 0.5rem;
      span {
        width: 40vw;
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
