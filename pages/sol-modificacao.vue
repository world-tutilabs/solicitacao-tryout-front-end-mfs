<template>
  <div>
    <div class="tabs">
      <button @click="newModification = true" :class="{ focus: newModification }">
        Sol. Disponíveis
      </button>
      <button @click="newModification = false" :class="{ focus: !newModification }">
        Histórico
      </button>
    </div>

    <div v-if="newModification">
      <ListCardsModifiedMolds />
    </div>

    <div v-else>
      <ListCardsSolicitationHistoric />
    </div>
  </div>
</template>

<script>

export default {
  name: 'IndexPage',
  middleware: 'auth_eng',
  created() {
    this.$store.commit('setFooterByRouter', 'solicitacoes-disponiveis')
  },
  data() {
    return {
      report_list: [],
      newModification: true,
    }
  },
  head() {
    return {
      title: 'TryOut - Moldes Modificados',
    }
  },

  watch: {
    newModification (newValue) {
      if(newValue) {
        this.$store.commit('setFooterByRouter', 'solicitacoes-disponiveis')
      } else {
        this.$store.commit('setFooterByRouter', 'solicitacoes-historico')
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.tabs {
  display: flex;
  height: 5rem;
  align-items: flex-end;
  margin-bottom: 0.5rem;

  button {
    width: 10rem;
    height: 3rem;
    padding: 0.7rem 0.5rem;
    font-size: 1rem;
    font-weight: var(--bold);
    border-radius: 0.5rem 0.5rem 0 0;
    background-color: var(--bg);
    border: 1px solid var(--gray_text);
    transition: 0.2s;

    &:hover {
      height: 3.5rem;
    }
  }

  .focus {
    height: 3.5rem;
    background: var(--green);
    border: 1px solid var(--green);
    color: var(--white);
  }
}
</style>
