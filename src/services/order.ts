import type { IOrderProps, ItemsProps, OrderProps } from '../@types'
import { axiosInstance } from './instance'

export async function makeOrder({ cartStore, itemsStore }: IOrderProps): Promise<OrderProps> {
	const { data } = await axiosInstance.post('/orders', {
		items: cartStore.cart,
		totalPrice: cartStore.totalPrice,
	})

	cartStore.cart = []
	itemsStore.items = itemsStore.items.map((item: ItemsProps) => ({
		...item,
		isAdded: false,
	}))

	return data
}

export async function getOrders(): Promise<OrderProps[]> {
	const { data } = await axiosInstance.get('/orders')

	return data
}
