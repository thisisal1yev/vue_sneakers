import { defineStore } from 'pinia'
import { ref } from 'vue'

import type { FiltersProps, ItemsProps } from '../@types'
import { getFavorites, getItems } from '../services/items'
import { useCartStore } from './useCartStore'

export const useItemsStore = defineStore('items', () => {
	const items = ref<ItemsProps[]>([])

	async function fetchItems(props: FiltersProps): Promise<void> {
		try {
			const cartStore = useCartStore()
			await getItems(props)
			const data = await getFavorites()
			items.value = data.value.map((item: ItemsProps) => ({
				...item,
				isAdded: cartStore.cart.some(cartItem => cartItem.id === item.id),
			}))
		} catch (e) {
			console.error(e)
		}
	}

	return { items, fetchItems }
})