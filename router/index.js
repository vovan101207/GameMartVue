import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    // Добавьте другие маршруты здесь
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
