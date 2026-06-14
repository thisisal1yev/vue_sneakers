import { defineStore } from 'pinia'
import { ref } from 'vue'

import type { IOrderProps, OrderProps } from '../@types'
import { getOrders, makeOrder } from '../services/order'
import { useNotificationStore } from './useNotificationStore'

export const useOrderStore = defineStore('order', () => {
	const orderId = ref<number | null>(null)
	const isCreatingOrder = ref<boolean>(false)
	const isLoadingOrders = ref<boolean>(false)
	const orders = ref<OrderProps[]>([])

	async function createOrder({ cartStore, itemsStore }: IOrderProps): Promise<void> {
		const notificationStore = useNotificationStore()

		try {
			isCreatingOrder.value = true

			const data = await makeOrder({ cartStore, itemsStore })

			orderId.value = data.id
			notificationStore.notify('Заказ успешно оформлен', 'success')
		} catch (e) {
			console.error(e)
			notificationStore.notify('Не удалось оформить заказ')
		} finally {
			isCreatingOrder.value = false
		}
	}

	async function fetchOrders(): Promise<void> {
		const notificationStore = useNotificationStore()

		try {
			isLoadingOrders.value = true
			orders.value = await getOrders()
		} catch (e) {
			console.error(e)
			notificationStore.notify('Не удалось загрузить заказы')
		} finally {
			isLoadingOrders.value = false
		}
	}

	function resetOrder(): void {
		orderId.value = null
	}

	return {
		orderId,
		isCreatingOrder,
		isLoadingOrders,
		orders,
		createOrder,
		fetchOrders,
		resetOrder,
	}
})
