<template>
  <listCardsModifiedMolds />
</template>

<script>

export default {
  name: 'IndexPage',
  created() {
    this.$store.commit('change_my_router', 'Solicitações de Modificação')
  },
  data() {
    return {
      report_list: [],
    }
  },
  head() {
    return {
      title: 'TryOut - Moldes Modificados',
    }
  },
}
</script>

<style lang="scss" scoped>
</style>
