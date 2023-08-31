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
				<button class="btn" @click="nextPage" v-if="listHistoric.length === 10"> 
					<img src="~/static/icons/arrowOpened.svg" class="img-next" />
				</button>
			</div>
		</div>

		<div v-if="valueSearch.length < 1">
			<CardHistorico v-for="mold in listHistoric" :key="mold.id" :dataMold="mold" />
		</div>

		<div v-else>
			<CardHistorico v-for="mold in filterSearchField" :key="mold.id" :dataMold="mold" @updateList="updateList" />
		</div>

	</div>
</template>

<script>
import httpLocal from "../../services/newMold/mold";

export default {

	data() {
		return {
			currentPage: 0,
			countPage: 1,
			listHistoric: [],
			valueSearch: "",
			listSearch: [],
		};
	},
	async mounted() {
		// Modelo não escalável
		await httpLocal.listAllHistoric(0, 200000).then((res) => {
			this.listSearch = res.data.result;
		});
	},

	computed: {
		filterSearchField() {
			this.valueSearch = this.valueSearch.toLowerCase();
			let allContent = this.listSearch.filter((filter) => {
				return (
					filter.client.toLowerCase().match(this.valueSearch) ||
					filter.injectionProcess.mold.desc_mold
						.toLowerCase()
						.match(this.valueSearch) ||
					String(filter.number_tryout).toLowerCase().match(this.valueSearch)
				);
			});
			return allContent;
		},
	},
	
	methods: {
		async listAllHistoricReq() {
			await httpLocal.listAllHistoric(this.currentPage, 10).then(async (res) => {
				this.listHistoric = res.data.result;
			});
		},

		async initPage() {
			[this.currentPage, this.countPage] = [0, 1]
			await this.listAllHistoricReq()
    	},

		async nextPage() {
			[this.currentPage, this.countPage] = [this.currentPage + 10, this.countPage + 1]
			await this.listAllHistoricReq()
		},

    	async backPage() {
			[this.currentPage, this.countPage] = [this.currentPage - 10, this.countPage - 1]
			await this.listAllHistoricReq()
    	}
	},

	async fetch() {
		await this.listAllHistoricReq();
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
