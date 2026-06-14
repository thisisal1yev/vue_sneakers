<script lang="ts" setup>
withDefaults(defineProps<{ count?: number }>(), { count: 8 })
</script>

<template>
	<div
		class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
	>
		<div
			v-for="n in count"
			:key="n"
			class="h-80 rounded-xl bg-slate-100 animate-pulse"
		/>
	</div>
</template>
