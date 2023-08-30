<template>
  <div>
    <ListCardPcpWaiting />
  </div>
</template>

<script>

export default {
  middleware: 'auth_pcp',
  head () {
    return {
      title: "PCP - Solicitações em Espera"
    }
  },
  created () {
    this.$store.commit('setFooterByRouter', 'PCP - Solicitações em Espera')
  },
  watch: {
    newModification (newValue) {
      if(newValue) {
        this.$store.commit('setFooterByRouter', 'PCP - Solicitações em Espera')
      } else {
        this.$store.commit('setFooterByRouter', 'PCP - Solicitações em Espera')
      }
    }
   }
}
</script>

<style>

</style>