export function debounce<T extends (...args: any[]) => void>(fn: T, ms = 300) {
	let timer: ReturnType<typeof setTimeout>

	return (...args: Parameters<T>): void => {
		clearTimeout(timer)
		timer = setTimeout(() => fn(...args), ms)
	}
}
