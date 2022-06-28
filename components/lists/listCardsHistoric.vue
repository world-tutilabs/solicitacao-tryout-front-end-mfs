<template>
  <div>
    <CardModel
      v-for="mold in listPaginated"
      :key="mold.id"
      :statusOrigin="mold.origin"
      :flag="mold.flag"
      :typeCard="mold.typeCard"
    />

    <Pagination :list="dataNewMold" @displayNewList="displayNewList"/>
  </div>
</template>

<script>

export default {

  data() {
    return {
      dataNewMold: [
        { id: 1, origin: 'Aprovado', flag: '1', typeCard: 'history' },
        { id: 2, origin: '', flag: '2', typeCard: 'history' },
        { id: 2, origin: 'Reprovado', flag: '3', typeCard: 'history' },
      ],

      listPaginated: [],
    }
  },

  methods: {
    displayNewList (e){
      this.listPaginated = e
    }
  }
}
</script>

<style>
</style>