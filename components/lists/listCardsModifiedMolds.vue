<template>
	<div v-if="$fetchState.pending">Carregando dados...</div>
	<div v-else>
		<div class="pagination-controller">
			<button class="btn" @click="backPage" v-if="currentPage > 0"><img src="~/static/icons/arrowOpened.svg" class="img-back"/></button>
			<button class="btn" @click="initPage" v-if="currentPage > 0">1</button>
			<button class="btn count">{{ countPage }}</button>
			<button class="btn" @click="nextPage" v-if="listAllReportApproveds.length === 10"> <img src="~/static/icons/arrowOpened.svg" class="img-next"/></button>
		</div>
		
		<CardNovasModificacoes v-for="(data, index) in listAllReportApproveds" :key="index" :dataListAllAprov="data" />
	</div>
</template>

<script>
import httpNovoMolde from '../../services/newMold/mold'

export default {
	data() {
		return {
			listAllReportApproveds: {},
			countPage: 1,
			currentPage: 0,
		};
	},

	methods: {
		async reqListDisponibles(){
			await httpNovoMolde.listAllAproveds(this.currentPage, 10, 5).then((res) => {
				this.listAllReportApproveds = res.data.result
			});
		},
		
		async initPage() {
			[this.currentPage, this.countPage] = [0,1]
			await this.reqListDisponibles()
		},

		async nextPage() {
			[this.currentPage, this.countPage] = [this.currentPage + 10, this.countPage + 1]
			await this.reqListDisponibles()
		},

		async backPage() {
			[this.currentPage, this.countPage] = [this.currentPage - 10, this.countPage - 1]
			await this.reqListDisponibles()
		}
	},

	async fetch() {
		await this.reqListDisponibles()
	}
};
</script>

<style lang="scss" scoped>
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
</style>
