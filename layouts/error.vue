<template>
  <div class="containerError">
    <div>
      <h1>Ooops...</h1>
      <h2 v-if="error.statusCode === 404">Página não encontrada :/</h2>
      <h1 v-else>Ocorreu um erro!</h1>
    </div>
    <div>
      <p>Parece que o link que você seguiu está no lugar não explorado. Que tal tentar algo diferente?</p>
      <NuxtLink to="/">Voltar</NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  props: ['error'],
  head() {
    return {
      title: "TryOut - Ocorreu um erro"
    };
  },
  layout: 'custom404' // you can set a custom layout for the error page
}
</script>
<style scoped>
  .containerError{
    background: #fff;
    height: 40vh;
    padding: var(--negativeSpace);
  }
  p{
    font-weight: var(--regular);
    font-size: max(1rem, 1.5vw);
  }
  a{
    background: var(--green);
    text-decoration: none;
    padding: .7rem 2rem;
    position: relative;
    top: 1rem;
    color: var(--white);
    font-weight: var(--bold);
  }
</style>
