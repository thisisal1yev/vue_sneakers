import { defineStore } from 'pinia'
import { ref } from 'vue'

import type { IOrderProps } from '../@types'
import { makeOrder } from '../services/order'

export const useOrderStore = defineStore('order', () => {
	const orderId = ref<number | null>(null)
	const isCreatingOrder = ref<boolean>(false)

	async function createOrder({ cartStore, itemsStore }: IOrderProps): Promise<void> {
		try {
			isCreatingOrder.value = true
			const data = await makeOrder({ cartStore, itemsStore })

			orderId.value = data.id
		} catch (e) {
			console.error(e)
		} finally {
			isCreatingOrder.value = false
		}
	}

	function resetOrder(): void {
		orderId.value = null
	}

	return { orderId, isCreatingOrder, createOrder, resetOrder }
})