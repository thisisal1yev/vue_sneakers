export function formatPrice(value: number): string {
	return `${value.toLocaleString('ru-RU')} ₽`
}

export function formatDate(value?: string): string {
	if (!value) return ''

	return new Date(value).toLocaleDateString('ru-RU', {
		day: '2-digit',
		month: 'long',
		year: 'numeric',
	})
}
