<script lang="ts" setup>
import type { ItemsProps } from '../@types'
import { useScrollLock } from '../composables/useScrollLock'
import { formatPrice } from '../utils/format'

interface Props {
	item: ItemsProps
}

defineProps<Props>()
defineEmits(['close'])

useScrollLock()
</script>

<template>
	<div
		@click="$emit('close')"
		class="fixed inset-0 z-20 bg-black/70 flex items-center justify-center p-4"
	>
		<div
			@click.stop
			role="dialog"
			aria-modal="true"
			:aria-label="item.title"
			class="relative bg-white rounded-2xl w-full max-w-md p-8"
		>
			<button
				@click="$emit('close')"
				class="absolute top-4 right-4 opacity-40 hover:opacity-100 transition cursor-pointer"
				aria-label="Закрыть"
			>
				<img src="/icons/close.svg" alt="" />
			</button>

			<img
				:src="item.imageUrl"
				:alt="item.title"
				width="220"
				height="220"
				class="w-full h-72 object-contain"
			/>

			<h2 class="mt-4 text-2xl font-bold">{{ item.title }}</h2>

			<div class="flex flex-col gap-1 mt-4">
				<span class="text-slate-400">Цена:</span>
				<span class="text-xl font-bold">{{ formatPrice(item.price) }}</span>
			</div>
		</div>
	</div>
</template>
