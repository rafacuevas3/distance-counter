import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import BalanceGeneral from '../views/BalanceGeneral.vue'
import RayadoDiario from '../views/RayadoDiario.vue'
import BaseCuentasT from '../views/BaseCuentasT.vue'

Vue.use(VueRouter)

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/login', name: 'Login', component: Login },
    { path: '/register', name: 'Register', component: Register },
    { path: '/balance-general', name: 'BalanceGeneral', component: BalanceGeneral },
    { path: '/rayado-diario', name: 'RayadoDiario', component: RayadoDiario },
    { path: '/base-cuentas-t', name: 'BaseCuentasT', component: BaseCuentasT },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})


router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/register'];

    const authRequired = !publicPages.includes(to.path);

    const loggedIn = localStorage.getItem('user');

    if (authRequired && !loggedIn) {
        return next('/login');
    }

    next();
})

export default router
