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
.search {
  width: 400px;
  background-color: var(--white);
  height: 50px;
  display: flex;
  align-items: center;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid var(--gray_text);
  img {
    position: absolute;
    left: 2.5rem;
  }
  input {
    width: 100%;
    height: 100%;
    padding-left: 45px;
    border: none;
    border-radius: 5px;
  }

}

@media only screen and (max-width: 548px) {
  input {
    width: auto;
  }
}
</style>
