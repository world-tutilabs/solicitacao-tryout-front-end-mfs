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
        { id: 1, origin: 'Aprovado', flag: '1', typeCard: 'solicitation' },
        { id: 2, origin: 'Reprovado', flag: '3', typeCard: 'solicitation' },
        { id: 3, origin: '', flag: '2', typeCard: 'solicitation' },
        { id: 4, origin: 'Aprovado', flag: '1', typeCard: 'solicitation' },
        { id: 5, origin: 'Reprovado', flag: '3', typeCard: 'solicitation' },
        { id: 6, origin: '', flag: '2', typeCard: 'solicitation' },
        { id: 7, origin: 'Aprovado', flag: '1', typeCard: 'solicitation' },
        { id: 8, origin: 'Reprovado', flag: '3', typeCard: 'solicitation' },
        { id: 9, origin: '', flag: '2', typeCard: 'solicitation' },
        { id: 10, origin: 'Aprovado', flag: '1', typeCard: 'solicitation' },
        { id: 11, origin: 'Reprovado', flag: '3', typeCard: 'solicitation' },
        { id: 12, origin: '', flag: '2', typeCard: 'solicitation' },
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