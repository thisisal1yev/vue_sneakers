<script lang="ts" setup>
import { onMounted } from 'vue'

import { CardList, InfoBlock, SkeletonGrid } from '../components'
import { useFavoritesStore } from '../stores'

const favoritesStore = useFavoritesStore()

onMounted(async () => await favoritesStore.fetchFavorites())
</script>

<template>
	<h1 class="text-3xl font-bold mb-8">Мои закладки</h1>

	<SkeletonGrid v-if="favoritesStore.isLoading" />

	<CardList
		v-else-if="favoritesStore.favorites.length"
		:items="favoritesStore.favorites"
		:isFavoritePage="true"
	/>

	<InfoBlock
		v-else
		:imageUrl="'/empty-box.png'"
		:title="'Закладок пока нет'"
		:description="'Добавьте кроссовки в закладки, и они появятся здесь.'"
	/>
</template>
