<template>
  <div>
    <CardModel
      v-for="mold in listPaginated"
      :key="mold.id"
      :statusOrigin="mold.origin"
      :flag="mold.flag"
      :typeCard="mold.typeCard"
    />

    <Pagination :list="dataNewMold" @displayNewList="displayNewList" />
  </div>
</template>

<script>

export default {
  data() {
    return {
      dataNewMold: [
        { id: 1, origin: 'PCP', flag: '1', typeCard: 'resinTest' },
        { id: 2, origin: 'PCP', flag: '2', typeCard: 'resinTest' },
        { id: 3, origin: 'PCP', flag: '3', typeCard: 'resinTest' },
      ],

      listPaginated: [],
    }
  },
  methods: {
    displayNewList(e) {
      this.listPaginated = e
    },
  },
}
</script>

<style>
</style>