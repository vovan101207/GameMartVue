import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue';
import Favorites from './pages/Favorites.vue'; // Изменен импорт

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/favorites',
        name: 'Favorites',
        component: Favorites // Добавлен маршрут для Favorites
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

export default router;
