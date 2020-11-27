import Vue from 'vue';
import Vuex from 'vuex';

import { alert } from './modules/alert';
import { account } from './modules/account';
import { users } from './modules/users';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        alert,
        account,
        users
    }
});

export default store;