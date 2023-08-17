<template>
  <div>
    <div class="tabs">
      <button @click="newMoldes = true" :class="{ focus: newMoldes }">
        Novos Moldes
      </button>
      <button @click="newMoldes = false" :class="{ focus: !newMoldes }">
        Histórico
      </button>
    </div>

    <div v-if="newMoldes">
      <ListCardsNewModel />
    </div>

    <div v-else>
      <ListCardsHistoric />
    </div>
  </div>
</template>

<script>
export default {
  name: "IndexPage",
  middleware: "auth_eng",

  head() {
    return {
      title: "TryOut - Novos Moldes",
    };
  },
  created: async function () {
    this.$store.commit("change_my_router", "Solicitações de TryOut");
    this.$store.commit('setFooterByRouter', 'novos-moldes')
  },

  watch: {
    newMoldes (newValue) {
      if(newValue) {
        this.$store.commit('setFooterByRouter', 'novos-moldes')
      } else {
        this.$store.commit('setFooterByRouter', 'novos-moldes-historico')
      }
    }
  },

  data() {
    return {
      newMoldes: true,
      data_inicial: "",
      data_final: "",
    };
  },
};
</script>
<style lang="scss" scoped>
.tabs {
  display: flex;
  height: 5rem;
  align-items: flex-end;

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
