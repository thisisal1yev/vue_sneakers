import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import type { ItemsProps } from '../@types'

export const useCartStore = defineStore('cart', () => {
	const cart = ref<ItemsProps[]>([])
	const cartIsEmpty = computed(() => cart.value.length <= 0)
	const totalCount = computed(() =>
		cart.value.reduce((acc, item) => acc + (item.quantity ?? 1), 0)
	)
	const totalPrice = computed(() =>
		cart.value.reduce((acc, item) => acc + item.price * (item.quantity ?? 1), 0)
	)
	const vatPrice = computed(() => Math.round(totalPrice.value * 0.05))

	function findLine(item: ItemsProps): ItemsProps | undefined {
		return cart.value.find(cartItem => cartItem.id === item.id)
	}

	function addToCart(item: ItemsProps): void {
		const line = findLine(item)

		if (line) {
			line.quantity = (line.quantity ?? 1) + 1
			return
		}

		item.quantity = 1
		item.isAdded = true
		cart.value.push(item)
	}

	function increment(item: ItemsProps): void {
		const line = findLine(item)
		if (line) line.quantity = (line.quantity ?? 1) + 1
	}

	function decrement(item: ItemsProps): void {
		const line = findLine(item)
		if (!line) return

		const next = (line.quantity ?? 1) - 1

		if (next <= 0) {
			removeFromCart(item)
		} else {
			line.quantity = next
		}
	}

	function removeFromCart(item: ItemsProps): void {
		cart.value = cart.value.filter(cartItem => cartItem.id !== item.id)
		item.isAdded = false
	}

	function addOrRemoveFromCart(item: ItemsProps): void {
		if (!item.isAdded) {
			addToCart(item)
		} else {
			removeFromCart(item)
		}
	}

	return {
		cart,
		totalCount,
		totalPrice,
		vatPrice,
		cartIsEmpty,
		addToCart,
		increment,
		decrement,
		removeFromCart,
		addOrRemoveFromCart,
	}
})
