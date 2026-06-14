<script lang="ts" setup>
import { useNotificationStore } from '../stores'

const notificationStore = useNotificationStore()
</script>

<template>
	<div class="fixed bottom-6 right-6 z-50" v-auto-animate>
		<div
			v-if="notificationStore.message"
			role="alert"
			class="px-5 py-3 rounded-xl text-white shadow-lg"
			:class="
				notificationStore.type === 'success' ? 'bg-lime-500' : 'bg-red-500'
			"
		>
			{{ notificationStore.message }}
		</div>
	</div>
</template>
