<script lang="ts" setup>
import { formatPrice } from '../utils/format'

interface Props {
	title: string
	img: string
	price: number
	isAdded?: boolean
	isFavorite?: boolean
	isFavoritePage?: boolean
}

defineProps<Props>()
defineEmits(['onClickAddToFavorites', 'onClickAddToCart', 'onClick'])
</script>

<template>
	<div
		@click="$emit('onClick')"
		class="relative flex flex-col w-full border border-slate-100 rounded-xl p-8 cursor-pointer transition hover:shadow-xl hover:transform hover:-translate-y-2"
	>
		<button
			v-if="!isFavoritePage"
			@click.stop="$emit('onClickAddToFavorites')"
			class="absolute top-8 left-8"
			:aria-label="isFavorite ? 'Убрать из закладок' : 'В закладки'"
		>
			<img
				:src="isFavorite ? '/icons/like-2.svg' : '/icons/like-1.svg'"
				alt=""
			/>
		</button>

		<img
			width="220"
			height="220"
			:src="img"
			class="w-full h-56"
			:alt="title"
		/>

		<p>{{ title }}</p>

		<div class="flex items-end justify-between grow mt-5">
			<div class="flex flex-col gap-2">
				<span class="text-slate-200">Цена:</span>

				<span class="font-bold">{{ formatPrice(price) }}</span>
			</div>

			<button
				v-if="!isFavoritePage"
				@click.stop="$emit('onClickAddToCart')"
				:aria-label="isAdded ? 'Убрать из корзины' : 'В корзину'"
			>
				<img
					:src="isAdded ? '/icons/checked.svg' : '/icons/plus.svg'"
					width="32"
					height="32"
					alt=""
				/>
			</button>
		</div>
	</div>
</template>
