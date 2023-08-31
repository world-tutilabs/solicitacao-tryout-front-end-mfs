<template>
  <div v-if="$fetchState.pending">
    <Loading />
  </div>

  <div v-else>
    <div class="internal-header">
			<InputSearch v-model="valueSearch" class="InputSearch" />
			<div class="pagination-controller" v-if="valueSearch.length < 1">
				<button class="btn" @click="backPage" v-if="currentPage > 0"><img src="~/static/icons/arrowOpened.svg" class="img-back" /></button>
				<button class="btn" @click="initPage" v-if="currentPage > 0">1</button>
				<button class="btn count">{{ countPage }}</button>
				<button class="btn" @click="nextPage" v-if="listRRIM.length === 10"> 
					<img src="~/static/icons/arrowOpened.svg" class="img-next" />
				</button>
			</div>
		</div>

    <div v-if="valueSearch.length < 1">
      <CardNovoMolde
        v-for="mold in listRRIM"
        :key="mold.id"
        :dataMold="mold"
      />
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
      await http.listAllRRIM(this.currentPage, 10, 2).then((res) => {
        this.listRRIM = res.data.list;
      });
    },

    async initPage() {
			[this.currentPage, this.countPage] = [0, 1]
			await this.reqListRRIM()
    	},

		async nextPage() {
			[this.currentPage, this.countPage] = [this.currentPage + 10, this.countPage + 1]
			await this.reqListRRIM()
		},

    	async backPage() {
			[this.currentPage, this.countPage] = [this.currentPage - 10, this.countPage - 1]
			await this.reqListRRIM()
    	}

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
		width: 100%;
		display: flex;
		gap: 0.5rem;
		justify-content: flex-end;
		margin: 0.5rem 0 0.5rem 0;

		.btn {
			border-radius: 0.25rem;
			width: 4rem;
			height: 2rem;
			border: 1px solid var(--green);
			background-color: transparent;
			display: flex;
			justify-content: center;
			align-items: center;

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

		.count {
			border: 2px solid var(--green);
		}
	}
}
</style>
