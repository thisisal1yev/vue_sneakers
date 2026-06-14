<script lang="ts" setup>
import { formatPrice } from '../utils/format'

interface Props {
	img: string
	title: string
	price: number
	quantity?: number
}

defineProps<Props>()
defineEmits(['onClickDelete', 'increment', 'decrement'])
</script>

<template>
	<div
		class="relative flex w-full border border-slate-100 rounded-xl p-4 gap-4"
	>
		<img :src="img" class="w-16 h-16" :alt="title" />

		<div class="flex flex-col w-full">
			<p>{{ title }}</p>

			<div class="flex items-center justify-between mt-5">
				<div class="flex items-center gap-2">
					<button
						@click="$emit('decrement')"
						class="w-6 h-6 flex items-center justify-center rounded border border-slate-200 hover:border-slate-400 transition cursor-pointer"
						aria-label="Уменьшить количество"
					>
						−
					</button>

					<span class="min-w-6 text-center">{{ quantity ?? 1 }}</span>

					<button
						@click="$emit('increment')"
						class="w-6 h-6 flex items-center justify-center rounded border border-slate-200 hover:border-slate-400 transition cursor-pointer"
						aria-label="Увеличить количество"
					>
						+
					</button>
				</div>

				<span class="font-bold">{{ formatPrice(price * (quantity ?? 1)) }}</span>

				<button @click="$emit('onClickDelete')" aria-label="Удалить из корзины">
					<img
						class="cursor-pointer opacity-30 hover:opacity-100 transition"
						src="/icons/close.svg"
						alt=""
					/>
				</button>
			</div>
		</div>
	</div>
</template>
