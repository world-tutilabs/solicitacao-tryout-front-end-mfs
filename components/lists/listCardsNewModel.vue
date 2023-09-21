<template>
  <div v-if="$fetchState.pending">
    <Loading />
  </div>

  <div v-else>
    <div class="internal-header">
      <section  class="filter-header">
        <InputSearch v-model="valueSearch" class="InputSearch" />
        <section class="header" > 
          <select v-model="selected" class="filterStatus" >
            <option value="Todos" >Todos</option>
            <option value="Molde Familia">Molde Familia</option>
          </select>
        </section>
      </section>

      <div class="pagination-controller" v-if="valueSearch.length < 1">
        <button
          class="btn"
          @click="backPage"
          v-if="currentPage > 0"
          :disabled="isDisabled"
        >
          <img src="~/static/icons/arrowOpened.svg" class="img-back" />
        </button>
        <button class="btn" @click="initPage" v-if="currentPage > 0">1</button>
        <button class="btn count">{{ countPage }}</button>
        <button
          class="btn"
          @click="nextPage"
          v-if="listRRIM.length === 10"
          :disabled="isDisabled"
        >
          <img src="~/static/icons/arrowOpened.svg" class="img-next" />
        </button>
      </div>
    </div>

    <div v-if="valueSearch.length < 1">
      <CardNovoMolde v-for="mold in listRRIM" :key="mold.id" :dataMold="mold" />
    </div>

    <div v-else>
      <CardNovoMolde
        v-for="mold in filterSearchField"
        :key="mold.id"
        :dataMold="mold"
      />
    </div>
  </div>
</template>

<script>
import http from "~/services/newMold/mold";
import CardNewModel from "../Cards/CardNovoMolde.vue";
import Pagination from "../Pagination.vue";
import Loading from "../Loading.vue";

export default {
  components: { CardNewModel, Pagination, Loading },

  data() {
    return {
      currentPage: 0,
      countPage: 1,
      valueSearch: "",
      listRRIM: [],
      listSearch: [],
      isDisabled: false,
      selected:"Todos",

    };
  },

  computed: {
    filterSearchField() {
      this.valueSearch = this.valueSearch.toLowerCase();
      let allContent = this.listSearch.filter((filter) => {
        return (
          filter.CLIENTE.toLowerCase().match(this.valueSearch) ||
          filter.MOLDE.toLowerCase().match(this.valueSearch) ||
          String(filter.ID).toLowerCase().match(this.valueSearch)
        );
      });
      return allContent;
    },
  },

  async mounted() {
    await http.listAllRRIM(0, 200000, 2).then((res) => {
      this.listSearch = res.data.list;
    });
  },

  methods: {
    async reqListRRIM() {
      this.isDisabled = true;
      await http.listAllRRIM(this.currentPage, 10, 2).then((res) => {
        this.listRRIM = res.data.list;
        this.isDisabled = false;
      });
    },

    async initPage() {
      [this.currentPage, this.countPage] = [0, 1];
      await this.reqListRRIM();
    },
    

    async nextPage() {
      [this.currentPage, this.countPage] = [
        this.currentPage + 10,
        this.countPage + 1,
      ];
      await this.reqListRRIM();
    },

    async backPage() {
      [this.currentPage, this.countPage] = [
        this.currentPage - 10,
        this.countPage - 1,
      ];
      await this.reqListRRIM();
    },
  },

  async fetch() {
    await this.reqListRRIM();
  },
};
</script>

<style lang="scss" scoped>
.internal-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  .pagination-controller {
    width: 20%;
    display: flex;
    gap: 0.5rem;
    justify-content: flex-end;
    margin: 0.5rem 0 0.5rem 0;

    .btn {
      border-radius: 0.25rem;
      width: 4rem;
      height: 2rem;
      border: 1px solid var(--green);
      background-color: var(--white);
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.2s;

      img {
        width: 1rem;
      }
      .img-next {
        transform: rotate(-90deg);
      }
      .img-back {
        transform: rotate(90deg);
      }
    }

    :hover {
      background-color: transparent;
    }

    .count {
      background-color: var(--green);
      color: var(--white);
    }
  }
}
.filter-header{
  display: flex; 
  flex-wrap: wrap;
  align-items: center; 
  gap: .5rem;
}
select {
  background-image: linear-gradient(120deg, green 50%, transparent 56%),
    linear-gradient(60deg, transparent 50%, green 56%),
    linear-gradient(to right, #ccc, #ccc);
  background-position: calc(100% - 15px) 1em, calc(100% - 20px) 1em,
    calc(100% - 2.5em) 0.5em;
  background-size: 6px 6px, 6px 6px, 1px 1.5em;
  background-repeat: no-repeat;
  border-color: #868686;
  outline: 0;
  height: 2.6rem;


  /* styling */
  background-color: white;
  border-radius: 4px;
  display: inline-block;
  font: inherit;
  line-height: 1em;
  padding: 0.5em 3.5em 0.5em 1em;

  /* reset */
  margin: 0;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;
}
select.filterStatus:focus {
  background-image: linear-gradient(45deg, green 50%, transparent 50%),
    linear-gradient(135deg, transparent 50%, green 50%),
    linear-gradient(to right, #ccc, #ccc);
  background-position: calc(100% - 15px) 1em, calc(100% - 20px) 1em,
    calc(100% - 2.5em) 0.5em;
  background-size: 5px 5px, 5px 5px, 1px 1.5em;
  background-repeat: no-repeat;
  border-color: green;
  outline: 0;
}

select:-moz-focusring {
  color: transparent;
  text-shadow: 0 0 0 #000;
}

</style>
