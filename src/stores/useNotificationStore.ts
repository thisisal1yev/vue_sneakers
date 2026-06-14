import { defineStore } from 'pinia'
import { ref } from 'vue'

export type NotificationType = 'error' | 'success'

export const useNotificationStore = defineStore('notification', () => {
	const message = ref<string | null>(null)
	const type = ref<NotificationType>('error')

	let timer: ReturnType<typeof setTimeout>

	function notify(msg: string, kind: NotificationType = 'error'): void {
		message.value = msg
		type.value = kind

		clearTimeout(timer)
		timer = setTimeout(() => {
			message.value = null
		}, 4000)
	}

	return { message, type, notify }
})
