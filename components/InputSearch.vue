<template>
  <div class="form">
    <div class="search">
      <img src="~/static/icons/searchIcon.svg" alt="" />
      <input
        type="text"
        placeholder="Cód.RRIM, Molde ou Cliente.."
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
<style scoped lang="scss">

.form {

  .search {
    width: 400px;
    height: 2rem;
    background-color: var(--white);
    height: auto;
    display: flex;
    align-items: center;
    margin: 10px 0;
    gap: 0.5rem;
    border-radius: 5px;
    border: 1px solid var(--gray_text);
    padding: 0.5rem;

    .inputSearch {
      width: 100%;
      height: 1.5rem;
      border: none;
    }
  }

}


</style>
