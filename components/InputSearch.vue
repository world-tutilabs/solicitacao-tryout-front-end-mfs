<template>
    <div class="form">
        <div class="search">
        <input type="text"
        placeholder="Cliente, Cód. SAP, Molde ou Nº Tryout"
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
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 5px;
}
input {
  border-radius: 4px;
  border: none;
  width: 400px;
  border: 1px solid var(--green);
  padding: 5px;
  margin-bottom: 20px;
}

button {
  padding: 5px;
  border-radius: 4px;
  color: var(--white);
  border: 1px solid var(--green);
  background-color: var(--green);
}
 @media only screen and (max-width: 548px) {
  input {
   width: auto;
  }
}

</style>