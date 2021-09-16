import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import Manage from "@/views/Manage.vue";
import store from '@/store';

const routes = [
    {
        name: 'home',
        path: '/',
        component: Home,
    },
    {
        name: 'about',
        path: '/about',
        component: About,
    },
    {
        name: 'manage',
        path: '/manage',
        meta: {
            requiresAuth: true,
        },
        component: Manage,
    },
    {
        path: '/:catchAll(.*)*',
        redirect: { name: 'home' }
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    linkExactActiveClass: 'text-blue-200'
});

router.beforeEach((to, from, next) => {
    if (!to.matched.some((record) => record.meta.requiresAuth)) {
        next();
        return;
    }
    if (store.state.userLoggedIn) {
        next();
        return;
    }
    next({ name: 'home' });

})

export default router;
