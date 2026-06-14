import { defineStore } from 'pinia'
import { ref } from 'vue'

import type { ItemsProps } from '../@types'
import { getFavorites } from '../services/favorites'
import { useNotificationStore } from './useNotificationStore'

export const useFavoritesStore = defineStore('favorites', () => {
	const favorites = ref<ItemsProps[]>([])

	async function fetchFavorites(): Promise<void> {
		const notificationStore = useNotificationStore()

		try {
			favorites.value = await getFavorites()
		} catch (e) {
			console.error(e)
			notificationStore.notify('Не удалось загрузить закладки')
		}
	}

	return { favorites, fetchFavorites }
})
