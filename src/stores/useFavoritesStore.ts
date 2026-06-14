import { defineStore } from 'pinia'
import { ref } from 'vue'

import type { ItemsProps } from '../@types'
import { getFavorites } from '../services/favorites'
import { useNotificationStore } from './useNotificationStore'

export const useFavoritesStore = defineStore('favorites', () => {
	const favorites = ref<ItemsProps[]>([])
	const isLoading = ref<boolean>(false)

	async function fetchFavorites(): Promise<void> {
		const notificationStore = useNotificationStore()

		try {
			isLoading.value = true
			favorites.value = await getFavorites()
		} catch (e) {
			console.error(e)
			notificationStore.notify('Не удалось загрузить закладки')
		} finally {
			isLoading.value = false
		}
	}

	return { favorites, isLoading, fetchFavorites }
})
