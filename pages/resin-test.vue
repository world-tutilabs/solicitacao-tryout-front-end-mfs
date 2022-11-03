<template>
  <div>
      <listCardResinTest />
  </div>
</template>
<script>

export default {
middleware: 'auth_eng',
  head() {
    return {
      title: 'TryOut - Testes de Resina',
    }
  },
}
</script>

<style lang="scss" scoped>
</style>
