<template>
  <div>
    <ListCardPcpApproveds />
  </div>
</template>

<script>

export default {

  head() {
    return {
      title: 'PCP - Solicitações Aprovadas',
    }
  },
  created () {
    this.$store.commit('setFooterByRouter', 'PCP - Solicitações Aprovadas')
  },
  watch: {
    newModification (newValue) {
      if(newValue) {
        this.$store.commit('setFooterByRouter', 'PCP - Solicitações Aprovadas')
      } else {
        this.$store.commit('setFooterByRouter', 'PCP - Solicitações Aprovadas')
      }
    }
   }
}
</script>

<style>
</style>
