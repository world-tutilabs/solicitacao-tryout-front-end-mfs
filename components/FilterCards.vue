<template>
  <div class="container">
    <div v-if="!routePcp" class="containerCard" >
    <NuxtLink to="/" class="cards">
      <span>Solicitações de</span>
      <h3>Novos Moldes</h3>

      <h5> {{ qtdNewModels }}</h5>
    </NuxtLink>

    <NuxtLink to="/modifications" class="cards">
      <span>Solicitações de</span>
      <h3>Modificação de Molde</h3>
      <h5>0</h5>
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
      qtdNewModels: 'Aguardando Dados...',
      qtdeModifications: 'Aguardando Dados...',
    };
  },

  async mounted() {
    if (this.$nuxt.$route.path === "/") {
      await this.reqSolicitations()
    }
    
  },
  methods: {

    async reqSolicitations() {
      await httpNewMold.listAllRRIM(0, 100000).then( (res) => {
        this.qtdNewModels = res.data.length
      })
    },

    async reqPCP() {
      await http.homologatePCP(0,10000).then((res) => {
        console.log(res.data)
      })
    }
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
