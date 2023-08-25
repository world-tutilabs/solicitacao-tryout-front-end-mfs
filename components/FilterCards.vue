<template>
  <div>
    <div v-if="!routePcp" class="container">
      <NuxtLink
        v-for="filter in filters"
        :key="filter.name"
        :to="filter.router"
        :class="{ cards: true }"
      >
        <span>{{ filter.topName }}</span>
        <h3>
          {{ filter.name }}
        </h3>
        <h3>{{ filter.count }}</h3>
      </NuxtLink>
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
          <span>
            {{ filter.name }}
          </span>
          <h3>{{ filter.count }}</h3>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
import httpNewMold from "../services/newMold/mold";
import httpPcp from "../services/pcp/pcp";

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

  async mounted () {
    if (this.$nuxt.$route.path === "/" || this.$nuxt.$route.path === '/sol-modificacao') {
      await httpNewMold.listAllRRIM(0, 10, 2).then((res) => {
        this.filters[0].count = res.data.countTotal;
      });

      await httpNewMold.listAllAproveds(0, 0, 5).then((res) => {
        this.filters[1].count = res.data.all
      })
    } 
    else {
      await httpPcp.listAllPcp(0, 100000, 3).then((res) => {
        this.filtersPcp[0].count = res.data.length;
      })

      // lista os que estao em aprovacao
      await httpNewMold.listAllAproveds(0, 0, 3, 2).then((res) => {
        this.filtersPcp[1].count = res.data.all;
        
      });

      // lista os que estao em concluido
      await httpNewMold.listAllAproveds(0, 10, 5, 2).then((res) => {
        this.filtersPcp[2].count = res.data.all;

      });

     
    }
  },

  methods: {
    greet(event) {
      if (event.name === "Modificações" || event.name === "Resina") {
        this.$toast.error("Funcionalidade em Desenvolvimento");
      }
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
    border: 1px solid var(--gray);
    width: 300px;
    padding: max(.3rem,1vw);
    height: 100%;
    max-height: 6rem;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    grid-gap: .4rem;
    gap: 0.2rem;
    transition: 0.1s;

    span {
      font-size: 0.9rem;
      font-weight: 600;
      
    }
    &:hover {
      background: var(--bg);
    }

    h3 {
      font-size: 1rem;
      font-weight: 500;
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
