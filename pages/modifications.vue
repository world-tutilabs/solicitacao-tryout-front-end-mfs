<template>
  <div>
    <h5 style="margin-top: 30px;">Módulo em Desenvolvimento...</h5>
  </div>
</template>

<script>

export default {
  name: 'IndexPage',
  middleware: 'auth_eng',
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
