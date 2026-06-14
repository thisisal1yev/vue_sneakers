import { onMounted, onUnmounted } from 'vue'

export function useScrollLock(): void {
	onMounted(() => {
		document.body.style.overflow = 'hidden'
	})

	onUnmounted(() => {
		document.body.style.overflow = ''
	})
}
