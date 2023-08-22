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

}
</script>

<style>

</style>