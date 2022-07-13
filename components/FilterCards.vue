<template>
  <div v-if="$fetchState.pending">
    <Loading />
  </div>
  <div class="container" v-else>
    <NuxtLink v-if="!routePcp" :to="`/${filter.router}`" v-for="filter in filters" :key="filter.name"
      :class="{ cards: true }">
      <span>{{ filter.topName }}</span>
      <h2>{{ filter.name }}</h2>
      <h3>{{ filter.count }}</h3>
    </NuxtLink>

    <NuxtLink v-if="routePcp" :to="`/${filterPcp.router}`" v-for="filterPcp in filtersPcp" :key="filterPcp.name"
      :class="{ cards: true }">
      <span>{{ filterPcp.topName }}</span>
      <h2>{{ filterPcp.name }}</h2>
      <h3>{{ filterPcp.count }}</h3>
    </NuxtLink>
  </div>
</template>

<script>
import httpLocal from '../services/newMold/mold'
import http from '../services/pcp/pcp'

export default {
  data() {
    return {
      listAllApproveds: [],
      listHistoric: [],
      filters: [
        { topName: 'Novos', name: 'Moldes', count: '000', router: '' },
        {
          topName: 'Solicitações de',
          name: 'Modificações',
          count: '000',
          router: 'modifications',
        },
        {
          topName: 'Solicitações testes de',
          name: 'Resina',
          count: '000',
          router: 'resin-test',
        },
      ],
      filtersPcp: [
        {
          topName: 'Solicitações',
          name: 'Espera',
          count: '000',
          router: 'pcp/waiting',
        },
        {
          topName: 'Solicitações',
          name: 'Aprovados',
          count: '000',
          router: 'pcp/approveds',
        },
      ],
    }
  },

  watch: {
    countNewMolds(newValue) {
      this.countNewMolds = newValue
    }
  },


  async fetch() {

    // Refatorar com VUEX

      await httpLocal.listAllHistoric().then(async (res) => {
        this.filters[0].count = res.data.length

        this.listHistoric = res.data

        this.listHistoric.map((item) => {
          if (item.homologation.status.id === 1) {
            this.listAllApproveds.push(item)
          }
        })

        this.filtersPcp[1].count = this.listAllApproveds.length

      })

      await http.listAllPcp().then((res) => {
        this.filtersPcp[0].count = res.data.length
      })


  },

  computed: {
    routePcp() {
      if (
        this.$route.name === 'pcp-waiting' ||
        this.$route.name === 'pcp-approveds'
      ) {
        return true
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  gap: 1rem;
  overflow: hidden;
  padding: 2px;
  width: 100%;
  padding-bottom: 20px;

  .cards {
    background: var(--white);
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
      rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    width: 300px;
    padding: max(0.3rem, 1vw);
    height: 100%;
    border-radius: 1rem;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;

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
