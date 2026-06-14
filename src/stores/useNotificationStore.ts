import { defineStore } from 'pinia'
import { ref } from 'vue'

export type NotificationType = 'error' | 'success'

export interface Notification {
	id: number
	message: string
	type: NotificationType
}

export const useNotificationStore = defineStore('notification', () => {
	const notifications = ref<Notification[]>([])

	let nextId = 0

	function dismiss(id: number): void {
		notifications.value = notifications.value.filter(n => n.id !== id)
	}

	function notify(message: string, type: NotificationType = 'error'): void {
		const id = ++nextId
		notifications.value.push({ id, message, type })
		setTimeout(() => dismiss(id), 4000)
	}

	return { notifications, notify, dismiss }
})
