import { createRouter, createWebHistory } from 'vue-router'
import { Favorites, Home, Orders } from './pages'

const routes = [
	{ path: '/', name: 'Home', component: Home },
	{ path: '/favorites', name: 'Favorites', component: Favorites },
	{ path: '/orders', name: 'Orders', component: Orders },
]

export const router = createRouter({
	history: createWebHistory(),
	routes,
})
