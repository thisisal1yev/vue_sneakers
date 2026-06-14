import type { FavoritesProps, ItemsProps } from '../@types'
import { useNotificationStore } from '../stores/useNotificationStore'
import { axiosInstance } from './instance'

export async function getFavorites(): Promise<ItemsProps[]> {
	const { data } = await axiosInstance.get('/favorites?_relations=items')

	return data.map((favorite: FavoritesProps) => favorite.item as ItemsProps)
}

export async function addToFavorites(item: ItemsProps): Promise<void> {
	const notificationStore = useNotificationStore()

	try {
		if (!item.isFavorite) {
			const obj = {
				itemId: item.id,
				item,
			}

			item.isFavorite = true

			const { data } = await axiosInstance.post('/favorites', obj)

			item.favoriteId = data.id
		} else {
			item.isFavorite = false
			await axiosInstance.delete(`/favorites/${item.favoriteId}`)

			item.favoriteId = null
		}
	} catch (e) {
		console.error(e)
		item.isFavorite = !item.isFavorite
		notificationStore.notify('Не удалось обновить закладки')
	}
}
