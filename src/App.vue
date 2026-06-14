<script lang="ts" setup>
import { onMounted, provide, reactive, ref, watch } from 'vue'
import { RouterView } from 'vue-router'

import type { FiltersProps, ItemsProps, SortBy } from './@types'
import { Header } from './components'
import Drawer from './components/Drawer.vue'
import { useCartStore, useItemsStore } from './stores'

const cartStore = useCartStore()
const itemsStore = useItemsStore()
const isDrawerOpen = ref<boolean>(false)
const filters = reactive<FiltersProps>({
	sortBy: 'title',
	searchQuery: '',
})

const toggleDrawer = (): void => {
	isDrawerOpen.value = !isDrawerOpen.value
}

const sort = (value: SortBy): void => {
	filters.sortBy = value
}

const search = (value: string): void => {
	filters.searchQuery = value.trim()
}

provide('items', { sort, search })

onMounted(async () => {
	const localCart = localStorage.getItem('cart')
	cartStore.cart = localCart ? JSON.parse(localCart) : []

	await itemsStore.fetchItems(filters)
})
watch(filters, itemsStore.fetchItems)
watch(
	cartStore,
	() => {
		localStorage.setItem('cart', JSON.stringify(cartStore.cart))
	},
	{ deep: true }
)
</script>

<template>
	<Drawer
		v-if="isDrawerOpen"
		@close="toggleDrawer"
		@deleteItem="(item:ItemsProps) => cartStore.removeFromCart(item)"
	/>

	<div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14">
		<Header :totalPrice="cartStore.totalPrice" @openDrawer="toggleDrawer" />

		<div class="p-10">
			<RouterView />
		</div>
	</div>
</template>
