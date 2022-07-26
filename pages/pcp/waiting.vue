<template>
  <div>
    <ListCardPcpWaiting />
  </div>
</template>

<script>

export default {
  // middleware: 'auth_pcp',
  head () {
    return {
      title: "PCP - Solicitações em Espera"
    }
  },
  created() {
    this.$store.commit('change_my_router', 'PCP - Solicitações em Espera')
  },

}
</script>

<style>

</style>