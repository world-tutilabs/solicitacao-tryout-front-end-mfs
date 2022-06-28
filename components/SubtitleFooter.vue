<template>
  <div class="content" v-if="relatorio">
    <div
      class="container"
      v-for="subtitle in subtitlesEng"
      :key="subtitle.title"
    >
      <div class="circle" :style="subtitle.background"></div>
      <h5>{{ subtitle.title }}</h5>
    </div>
  </div>

  <div class="content" v-else>
    <div
      class="container"
      v-for="subtitle in subtitlesPCP"
      :key="subtitle.title"
    >
      <div class="circle" :style="subtitle.background"></div>
      <h5>{{ subtitle.title }}</h5>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      subtitlesEng: [
        { title: 'Análise', background: 'background: var(--blue)' },
        { title: 'Aprovado', background: 'background: var(--green)' },
        { title: 'Reprovado', background: 'background: var(--orange)' },
      ],
      subtitlesPCP: [
        { title: 'Solicitação TryOut', background: 'background: var(--blue)' },
        {
          title: 'Modificação de Molde',
          background: 'background: var(--green)',
        },
        { title: 'Teste de Resina', background: 'background: var(--orange)' },
      ],
    }
  },
  computed: {
    relatorio() {
      if (
        this.$route.name !== 'pcp-waiting' &&
        this.$route.name !== 'pcp-approveds'
      ) {
        return true
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.content {
  background: var(--gray);
  width: 100%;
  height: 10vh;
  display: flex;
  gap: 2rem;
  align-items: center;
  padding: 0 var(--negativeSpace);

  position: sticky;
  bottom: 0;
  box-shadow: 0px 2px 0.5rem #757575a6;
  .container {
    display: flex;
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
