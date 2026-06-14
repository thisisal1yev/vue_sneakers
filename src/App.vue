<script lang="ts" setup>
import { computed, onMounted, provide, reactive, ref, watch } from 'vue'
import { RouterView } from 'vue-router'

import type { FiltersProps, SortBy } from './@types'
import { Header, Toast } from './components'
import Drawer from './components/Drawer.vue'
import { useCartStore, useItemsStore } from './stores'
import { debounce } from './utils/debounce'

const cartStore = useCartStore()
const itemsStore = useItemsStore()
const isDrawerOpen = ref<boolean>(false)
const filters = reactive<FiltersProps>({
	sortBy: 'title',
	searchQuery: '',
})

const favoritesCount = computed(
	() => itemsStore.items.filter(item => item.isFavorite).length
)

const toggleDrawer = (): void => {
	isDrawerOpen.value = !isDrawerOpen.value
}

const sort = (value: SortBy): void => {
	filters.sortBy = value
}

const search = debounce((value: string): void => {
	filters.searchQuery = value.trim()
}, 300)

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
	<Drawer v-if="isDrawerOpen" @close="toggleDrawer" />

	<div class="bg-white w-full sm:w-4/5 m-auto rounded-xl shadow-xl mt-14">
		<Header
			:totalPrice="cartStore.totalPrice"
			:totalCount="cartStore.totalCount"
			:favoritesCount="favoritesCount"
			@openDrawer="toggleDrawer"
		/>

		<div class="p-6 sm:p-10">
			<RouterView />
		</div>
	</div>

	<Toast />
</template>
