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

export default{
  data(){
    return {
      dataNewMold: [
        { id: 1, origin: 'RRIM', flag: '0', typeCard: 'newModel' },
        { id: 2, origin: 'RRIM', flag: '0', typeCard: 'newModel' },
        { id: 3, origin: 'RRIM', flag: '0', typeCard: 'newModel' },
        { id: 4, origin: 'RRIM', flag: '0', typeCard: 'newModel' },
        { id: 5, origin: 'RRIM', flag: '0', typeCard: 'newModel' },
        { id: 6, origin: 'RRIM', flag: '0', typeCard: 'newModel' },
        { id: 7, origin: 'RRIM', flag: '0', typeCard: 'newModel' },
        { id: 8, origin: 'RRIM', flag: '0', typeCard: 'newModel' },
        { id: 9, origin: 'RRIM', flag: '0', typeCard: 'newModel' },
        { id: 10, origin: 'RRIM', flag: '0', typeCard: 'newModel' },
        { id: 11, origin: 'RRIM', flag: '0', typeCard: 'newModel' },
        { id: 12, origin: 'RRIM', flag: '0', typeCard: 'newModel' },
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
