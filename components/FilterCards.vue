<template>
  <div class="container">
    <div v-if="this.$nuxt.$route.path === '/'" class="containerCard" >
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
  <div class="containerCard" v-else >
    <NuxtLink to="/pcp/waiting" class="cards">
      <span>Solicitações</span>
      <h3>em Espera</h3>
      <h5>{{ qtdePcpWaiting }}</h5>
    </NuxtLink>

    <NuxtLink to="/pcp/approveds" class="cards">
      <span>Solicitações</span>
      <h3>Aprovadas</h3>
      <h5>{{ qtdeSolApproved }}</h5>
    </NuxtLink>

    <NuxtLink to="/pcp/completed" class="cards">
      <span>Solicitações</span>
      <h3>Concluidas</h3>
      <h5> {{ qtdFinished }}</h5>
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
      qtdePcpWaiting: 'Aguardando Dados...',
      qtdeSolApproved: 'Aguardando Dados...',
      qtdFinished: 'Aguardando Dados...'
    };
  },

  async mounted() {
    if (this.$nuxt.$route.path === "/") {
      await this.reqSolicitations()
    } else {
      await this.reqPCPWaiting()
      await this.reqHomologatedPCP()
      await this.reqFinished()
    }
    
  },
  methods: {

    async reqSolicitations() {
      await httpNewMold.listAllRRIM(0, 100000).then( (res) => {
        this.qtdNewModels = res.data.length
      })
    },

    // novas modificações de moldes

    async reqPCPWaiting() {
      await http.listAllPcp().then((res) => {
        this.qtdePcpWaiting = res.data.length
      })
    },

    async reqHomologatedPCP() {
      let countHistoric = 0
      await httpNewMold.listAllHistoric(0, 10000).then((res) => {
        res.data.map((item) => {
          if (item.homologation.status.id === 1) {
            countHistoric = countHistoric + 1;
          }
        });
        this.qtdeSolApproved = countHistoric;
      });
    },

    async reqFinished() {
      await httpNewMold.listAllAproveds(1000, 10, 5).then( (res) => {
        this.qtdFinished = res.data.all
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
