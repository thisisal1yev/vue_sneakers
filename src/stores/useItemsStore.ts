import { defineStore } from 'pinia'
import { ref } from 'vue'

import type { FiltersProps, ItemsProps } from '../@types'
import { getFavorites, getItems } from '../services/items'
import { useCartStore } from './useCartStore'
import { useNotificationStore } from './useNotificationStore'

export const useItemsStore = defineStore('items', () => {
	const items = ref<ItemsProps[]>([])
	const isLoading = ref<boolean>(false)

	async function fetchItems(props: FiltersProps): Promise<void> {
		const cartStore = useCartStore()
		const notificationStore = useNotificationStore()

		try {
			isLoading.value = true

			const fetched = await getItems(props)
			const withFavorites = await getFavorites(fetched)

			items.value = withFavorites.map((item: ItemsProps) => ({
				...item,
				isAdded: cartStore.cart.some(cartItem => cartItem.id === item.id),
			}))
		} catch (e) {
			console.error(e)
			notificationStore.notify('Не удалось загрузить товары')
		} finally {
			isLoading.value = false
		}
	}

	return { items, isLoading, fetchItems }
})
