import type { FavoriteProps, FiltersProps, ItemsProps } from '../@types'
import type { TItems } from '../items.data'
import { axiosInstance } from './instance'

export async function getItems(props: FiltersProps): Promise<ItemsProps[]> {
	const params = {
		sortBy: props.sortBy,
		title: `*${props.searchQuery}*`,
	}

	const { data } = await axiosInstance.get('/items', { params })

	return data.map((obj: TItems) => ({
		...obj,
		isFavorite: false,
		isAdded: false,
		favoriteId: null,
	}))
}

export async function getFavorites(items: ItemsProps[]): Promise<ItemsProps[]> {
	const { data: favorites } = await axiosInstance.get('/favorites')

	return items.map((item: ItemsProps) => {
		const favorite = favorites.find(
			(favorite: FavoriteProps) => favorite.itemId === item.id
		)

		if (!favorite) return item

		return {
			...item,
			isFavorite: true,
			favoriteId: favorite.id,
		}
	})
}
