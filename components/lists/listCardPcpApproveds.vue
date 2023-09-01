<template>
	<div v-if="$fetchState.pending">
		<Loading />
	</div>
	<div v-else>
		<div class="pagination-controller">
			<button class="btn" @click="backPage" v-if="currentPage > 0" :disabled="isDisabled"><img
					src="~/static/icons/arrowOpened.svg" class="img-back" /></button>
			<button class="btn" @click="initPage" v-if="currentPage > 0">1</button>
			<button class="btn count">{{ countPage }}</button>
			<button class="btn" @click="nextPage" :disabled="isDisabled" v-if="listHistoric.length === 10">
				<img src="~/static/icons/arrowOpened.svg" class="img-next" />
			</button>
		</div>

		<CardModal v-for="mold in listHistoric" :key="mold.id" :dataMold="mold" :description="mold.reason.description" />
	</div>
</template>

<script>
import http from "../../services/newMold/mold";
export default {
	data() {
		return {
			listHistoric: [],
			countPage: 1,
			currentPage: 0,
			isDisabled: false
		};
	},
	methods: {
		async listAllHistoricReq() {
			this.isDisabled = true
			await http.listAllAproveds(this.currentPage, 10, 3, 2).then((res) => {
				this.listHistoric = res.data.result;
				this.isDisabled = false
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
		background-color: var(--white);
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

	:hover {
		background-color: transparent;
	}


	.count {
		background-color: var(--green);
		color: var(--white);
	}
}
</style>
