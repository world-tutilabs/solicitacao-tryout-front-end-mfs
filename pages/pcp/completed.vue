<template>
  <div>
    <listCardPcpCompleted />
  </div>
</template>

<script>

export default {

  head() {
    return {
      title: 'PCP - Solicitações Concluidas',
    }
  },
  created() {
    this.$store.commit('change_my_router', 'PCP - Solicitações Concluidas')
  },
}
</script>

<style>
</style>

