<script lang="ts" setup>
import { computed, onMounted, onUnmounted } from 'vue'

import { useScrollLock } from '../composables/useScrollLock'
import { formatPrice } from '../utils/format'
import { useCartStore, useItemsStore, useOrderStore } from '../stores'
import { CartItem, InfoBlock } from './'

const emit = defineEmits(['close'])

const cartStore = useCartStore()
const itemsStore = useItemsStore()
const orderStore = useOrderStore()
const disabledButton = computed(
	() => orderStore.isCreatingOrder || cartStore.cartIsEmpty
)

useScrollLock()

function onKeydown(e: KeyboardEvent): void {
	if (e.key === 'Escape') emit('close')
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => {
	window.removeEventListener('keydown', onKeydown)
	orderStore.resetOrder()
})
</script>

<template>
	<div
		@click="$emit('close')"
		class="fixed z-10 top-0 h-full w-full bg-black opacity-70"
	/>

	<div
		v-if="!cartStore.cartIsEmpty"
		role="dialog"
		aria-modal="true"
		aria-label="Корзина"
		class="flex flex-col justify-between fixed z-10 top-0 h-full right-0 w-full sm:w-96 bg-white px-8 py-5"
	>
		<h2 class="text-2xl font-bold mb-10 flex items-center gap-5">
			<button @click="$emit('close')" class="p-2 group" aria-label="Закрыть корзину">
				<svg
					class="rotate-180 group-hover:-translate-x-1 opacity-30 group-hover:opacity-100 transition cursor-pointer"
					width="16"
					height="14"
					viewBox="0 0 16 14"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M1 7H14.7143"
						stroke="black"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>

					<path
						d="M8.71436 1L14.7144 7L8.71436 13"
						stroke="black"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</button>

			Корзина
		</h2>

		<div class="overflow-auto flex-1 grow space-y-3 my-5" v-auto-animate>
			<CartItem
				v-for="item in cartStore.cart"
				:key="item.id"
				:title="item.title"
				:price="item.price"
				:img="item.imageUrl"
				:quantity="item.quantity"
				@increment="cartStore.increment(item)"
				@decrement="cartStore.decrement(item)"
				@onClickDelete="cartStore.removeFromCart(item)"
			/>
		</div>

		<div>
			<div class="flex flex-col gap-5">
				<div class="flex items-end gap-2">
					<span>Итого:</span>

					<div class="flex-1 border-b border-dashed" />

					<span class="font-bold">
						{{ formatPrice(cartStore.totalPrice + cartStore.vatPrice) }}
					</span>
				</div>

				<div class="flex items-end gap-2">
					<span>Налог 5%:</span>

					<div class="flex-1 border-b border-dashed" />

					<span class="font-bold">{{ formatPrice(cartStore.vatPrice) }}</span>
				</div>
			</div>

			<button
				@click="orderStore.createOrder({ cartStore, itemsStore })"
				:disabled="disabledButton"
				class="flex justify-center items-center gap-3 w-full py-3 mt-10 bg-lime-500 text-white rounded-xl transition active:bg-lime-700 hover:bg-lime-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
			>
				<svg
					v-if="orderStore.isCreatingOrder"
					class="animate-spin w-5 h-5"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<circle
						class="opacity-25"
						cx="12"
						cy="12"
						r="10"
						stroke="currentColor"
						stroke-width="4"
					/>
					<path
						class="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
					/>
				</svg>

				{{ orderStore.isCreatingOrder ? 'Оформление...' : 'Оформить заказ' }}

				<img v-if="!orderStore.isCreatingOrder" src="/icons/arrow-next.svg" alt="" />
			</button>
		</div>
	</div>

	<div
		v-else
		role="dialog"
		aria-modal="true"
		class="flex flex-col justify-center fixed z-10 top-0 h-full right-0 w-full sm:w-96 bg-white px-8 py-5"
	>
		<InfoBlock
			v-if="!cartStore.totalPrice && orderStore.orderId"
			:imageUrl="'/success.png'"
			:title="'Заказ оформлен'"
			:description="`Ваш заказ #${orderStore.orderId} скоро будет передан курьерской доставке`"
		/>

		<InfoBlock
			v-else
			:imageUrl="'/empty-box.png'"
			:title="'Корзина пуста'"
			:description="'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'"
		/>

		<button
			@click="$emit('close')"
			class="flex justify-center items-center gap-3 w-full py-3 mt-10 bg-lime-500 text-white rounded-xl transition active:bg-lime-700 hover:bg-lime-600"
		>
			<img src="/icons/arrow-left.svg" alt="" />

			Вернуться назад
		</button>
	</div>
</template>
