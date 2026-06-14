<script lang="ts" setup>
import { useNotificationStore } from '../stores'

const notificationStore = useNotificationStore()
</script>

<template>
	<div class="fixed bottom-6 right-6 z-50 flex flex-col gap-3" v-auto-animate>
		<div
			v-for="n in notificationStore.notifications"
			:key="n.id"
			role="alert"
			class="flex items-center gap-4 px-5 py-3 rounded-xl text-white shadow-lg"
			:class="n.type === 'success' ? 'bg-lime-500' : 'bg-red-500'"
		>
			<span>{{ n.message }}</span>

			<button
				@click="notificationStore.dismiss(n.id)"
				class="opacity-70 hover:opacity-100 transition cursor-pointer"
				aria-label="Закрыть уведомление"
			>
				✕
			</button>
		</div>
	</div>
</template>
