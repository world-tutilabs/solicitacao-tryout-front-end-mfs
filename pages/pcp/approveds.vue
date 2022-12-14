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
  created() {
    this.$store.commit('change_my_router', 'PCP - Solicitações Aprovadas')
  },
}
</script>

<style>
</style>
