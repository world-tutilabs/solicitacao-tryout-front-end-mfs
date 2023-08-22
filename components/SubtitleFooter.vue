<template>
  <div class="content">
    <div class="container" v-for="subtitle in legenda_geral" :key="subtitle.title" v-if="$store.state.showFooter === 'novos-moldes-historico'">
      <div class="circle" :style="subtitle.background"></div>
      <h5>{{ subtitle.title }}</h5>
    </div>

    <div class="container" v-for="subtitle in legenda_modificacoes" :key="subtitle.title"  v-if="$store.state.showFooter === 'solicitacoes-historico' || $store.state.showFooter === 'solicitacoes-disponiveis'">
      <div class="circle" :style="subtitle.background"></div>
      <h5>{{ subtitle.title }}</h5>
    </div>

    <!-- <div class="container" v-for="subtitle in legenda_pcp" :key="subtitle.title">
      <div class="circle" :style="subtitle.background"></div>
      <h5>{{ subtitle.title }}</h5>
    </div> -->
  </div>

</template>

<script>
export default {
  data() {
    return {
      legenda_geral: [
        { title: 'Sol. em Análise', background: 'background: var(--blue)' },
        { title: 'Sol. Aprovada', background: 'background: var(--green)' },
        { title: 'Sol. Reprovada', background: 'background: var(--orange)' },
        { title: 'Relatório Aprovado', background: 'background: var(--lilac)' },
        { title: 'Relatório Reprovado', background: 'background: var(--red)' }
      ],

      legenda_modificacoes: [
        { title: 'Sol. em Análise', background: 'background: var(--blue)' },
        { title: 'Sol. Aprovada', background: 'background: var(--green)' },
        { title: 'Sol. Reprovada', background: 'background: var(--orange)' },
        { title: 'Relatório Aprovado', background: 'background: var(--lilac)' },
        { title: 'Relatório Reprovado', background: 'background: var(--red)' }
      ],
      legenda_pcp: [
        { title: 'Novos TryOuts', background: 'background: var(--blue)' },
        { title: 'Solicitação de Modificação', background: 'background: var(--green)'},
        { title: 'Solicitação de NP', background: 'background: var(--orange)' },
        { title: 'Retroativo', background: 'background: #fa2e59' },
      ],
    }
  },

}
</script>

<style lang="scss" scoped>
.content {
  background: var(--gray);
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  align-items: center;
  padding: 1rem var(--negativeSpace);

  position: sticky;
  bottom: 0;
  box-shadow: 0px 2px 0.5rem #757575a6;

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;

    @media (max-width: 378px) {
      flex-direction: column;
      text-align: center;
    }

    .circle {
      width: 2rem;
      min-width: 2rem;
      height: 2rem;
      min-height: 2rem;
      border-radius: 50%;
    }
  }
}
</style>
