<script lang="ts" setup>
import { onMounted } from 'vue'

import { InfoBlock } from '../components'
import { useOrderStore } from '../stores'
import { formatDate, formatPrice } from '../utils/format'

const orderStore = useOrderStore()

onMounted(async () => await orderStore.fetchOrders())
</script>

<template>
	<h1 class="text-3xl font-bold mb-8">Мои заказы</h1>

	<div v-if="orderStore.isLoadingOrders" class="flex flex-col gap-5">
		<div
			v-for="n in 3"
			:key="n"
			class="h-32 rounded-xl bg-slate-100 animate-pulse"
		/>
	</div>

	<div
		v-else-if="orderStore.orders.length"
		class="flex flex-col gap-5"
		v-auto-animate
	>
		<div
			v-for="order in orderStore.orders"
			:key="order.id"
			class="border border-slate-100 rounded-xl p-6"
		>
			<div class="flex items-center justify-between mb-1">
				<span class="font-bold">Заказ #{{ order.id }}</span>
				<span class="font-bold">{{ formatPrice(order.totalPrice) }}</span>
			</div>

			<p v-if="order.createdAt" class="text-slate-400 text-sm mb-4">
				{{ formatDate(order.createdAt) }}
			</p>

			<div class="flex flex-wrap gap-3">
				<img
					v-for="item in order.items"
					:key="item.id"
					:src="item.imageUrl"
					:alt="item.title"
					width="64"
					height="64"
					loading="lazy"
					class="w-16 h-16 rounded-lg border border-slate-100"
				/>
			</div>
		</div>
	</div>

	<InfoBlock
		v-else
		:imageUrl="'/empty-box.png'"
		:title="'Заказов пока нет'"
		:description="'Оформите первый заказ, и он появится здесь.'"
	/>
</template>
