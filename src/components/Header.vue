<script lang="ts" setup>
import { formatPrice } from '../utils/format'

interface Props {
	totalPrice: number
	totalCount: number
	favoritesCount: number
}

defineProps<Props>()
defineEmits(['openDrawer'])
</script>

<template>
	<header
		class="flex flex-col gap-4 sm:flex-row sm:items-center justify-between border-b border-slate-200 px-6 py-6 sm:px-10 sm:py-8"
	>
		<RouterLink to="/" class="flex items-center gap-4">
			<img src="/logo.png" alt="Vue Sneakers" class="w-11" />
			<div>
				<h2 class="font-bold text-xl uppercase">Vue Sneakers</h2>

				<p class="text-slate-400">Магазин лучших кроссовок</p>
			</div>
		</RouterLink>

		<ul class="flex items-center gap-4 sm:gap-8">
			<li>
				<button
					@click="$emit('openDrawer')"
					class="relative flex items-center gap-3 cursor-pointer"
					aria-label="Открыть корзину"
				>
					<img src="/icons/cart.svg" alt="" />

					<span
						v-if="totalCount"
						class="absolute -top-2 -left-2 min-w-5 h-5 px-1 flex items-center justify-center text-xs text-white bg-lime-500 rounded-full"
					>
						{{ totalCount }}
					</span>

					<b>{{ formatPrice(totalPrice) }}</b>
				</button>
			</li>

			<li>
				<RouterLink
					to="/favorites"
					class="relative flex items-center gap-3 cursor-pointer"
				>
					<img src="/icons/heart.svg" alt="" />

					<span
						v-if="favoritesCount"
						class="absolute -top-2 -left-2 min-w-5 h-5 px-1 flex items-center justify-center text-xs text-white bg-lime-500 rounded-full"
					>
						{{ favoritesCount }}
					</span>

					<span>Закладки</span>
				</RouterLink>
			</li>

			<li>
				<RouterLink to="/orders" class="flex items-center gap-3 cursor-pointer">
					<img src="/icons/profile.svg" alt="" />

					<span>Заказы</span>
				</RouterLink>
			</li>
		</ul>
	</header>
</template>
