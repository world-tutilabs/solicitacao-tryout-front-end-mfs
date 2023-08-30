<template>
  <div>
    <listCardPcpCompleted />
  </div>
</template>

<script>

export default {
  data() {
    return {
      newModification: true,
    }
  },
  head() {
    return {
      title: 'PCP - Solicitações Concluidas',
    }
  },
  created () {
    this.$store.commit('setFooterByRouter', 'PCP - Solicitações Concluidas')
  },
  watch: {
    newModification (newValue) {
      if(newValue) {
        this.$store.commit('setFooterByRouter', 'PCP - Solicitações Concluidas')
      } else {
        this.$store.commit('setFooterByRouter', 'PCP - Solicitações Concluidas')
      }
    }
   }
}
</script>

<style>
</style>
