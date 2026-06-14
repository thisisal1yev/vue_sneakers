<script lang="ts" setup>
import { onMounted } from 'vue'

import { InfoBlock } from '../components'
import { useOrderStore } from '../stores'
import { formatPrice } from '../utils/format'

const orderStore = useOrderStore()

onMounted(async () => await orderStore.fetchOrders())
</script>

<template>
	<h1 class="text-3xl font-bold mb-8">Мои заказы</h1>

	<div v-if="orderStore.orders.length" class="flex flex-col gap-5" v-auto-animate>
		<div
			v-for="order in orderStore.orders"
			:key="order.id"
			class="border border-slate-100 rounded-xl p-6"
		>
			<div class="flex items-center justify-between mb-4">
				<span class="font-bold">Заказ #{{ order.id }}</span>
				<span class="font-bold">{{ formatPrice(order.totalPrice) }}</span>
			</div>

			<div class="flex flex-wrap gap-3">
				<img
					v-for="item in order.items"
					:key="item.id"
					:src="item.imageUrl"
					:alt="item.title"
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
