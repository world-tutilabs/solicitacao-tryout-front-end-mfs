<template>
  <div class="form">
    <div class="search">
      <input
        type="text"
        placeholder="Cód.RRIM ou Cliente.."
        class="inputSearch"
        :value="valueSearch"
        @input="onInput"
      />
    </div>
  </div>
</template>
<script lang="js">
    export default {
      model: {
        prop: 'text',
        event: 'update'
      },
      props: {
        valueSearch: {
          type: String,
          default: ''
        }
      },
      methods: {
        onInput(event) {
          this.$emit('update', event.target.value)
        }
      }
    }
  </script>
<style scoped>
.search {
  font-size: 1.2rem;
  background-color: var(--gray) !important;
  padding: 1rem;
}
input {
  border-radius: 4px;
  border: none;
  width: 400px;
  height: 2.4rem;
  border: 2px solid var(--green);
  padding: 5px;
  margin-bottom: 20px;
  
}

@media only screen and (max-width: 548px) {
  input {
    width: auto;
  }
}
</style>