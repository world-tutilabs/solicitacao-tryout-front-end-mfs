<template>
  <div>
    <ListCardPcpWaiting />
  </div>
</template>

<script>

export default {

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