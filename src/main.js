import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';

// import VeeValidate from 'vee-validate';
import { configureFakeBackend } from './helpers';
import moment from 'moment'

// Vue.use(VeeValidate);

Vue.config.productionTip = false

Vue.filter('date', (value, format = 'DD/MM/YY HH:mm A') => {
    return moment(value).format(format)
})

configureFakeBackend();

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
