import { userService } from '../../services';
import { rayadoService } from '../../services';
import { balanceService } from '../../services';
import router from '../../router';

const user = JSON.parse(localStorage.getItem('user'));
const state = user
    ? { status: { loggedIn: true }, user }
    : { status: {}, user: null };

const actions = {
    login({ dispatch, commit }, { username, password }) {
        commit('loginRequest', { username });
    
        userService.login(username, password)
            .then(
                user => {
                    commit('loginSuccess', user);
                    router.push('/');
                },
                error => {
                    commit('loginFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    },
    logout({ commit }) {
        userService.logout();
        commit('logout');
        router.push('/login');
    },
    register({ dispatch, commit }, user) {
        commit('registerRequest', user);
    
        userService.register(user)
            .then(
                user => {
                    commit('registerSuccess', user);
                    router.push('/login');
                    setTimeout(() => {
                        // display success message after route change completes
                        dispatch('alert/success', 'Registration successful', { root: true });
                    })
                },
                error => {
                    commit('registerFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    },
    registerRayado({ dispatch, commit }, payload) {
        rayadoService.register(payload.rayado)
            .then(
                () => {
                    commit('setUser', JSON.parse(localStorage.getItem('user')));

                    router.push('/');

                    setTimeout(() => {
                        // display success message after route change completes
                        dispatch('alert/success', 'Registro de rayado completo', { root: true });
                    })
                },
                error => {
                    dispatch('alert/error', error, { root: true });
                }
            );
    },
    registerBalance({ dispatch, commit }, payload) {
        balanceService.register(payload.balance)
            .then(
                () => {
                    commit('setUser', JSON.parse(localStorage.getItem('user')));

                    router.push('/');
                    
                    setTimeout(() => {
                        // display success message after route change completes
                        dispatch('alert/success', 'Registro de balance completo', { root: true });
                    })
                },
                error => {
                    dispatch('alert/error', error, { root: true });
                }
            );
    },
    deleteBalance({ commit }, payload) {
        balanceService.delete(payload.userId, payload.itemId).then(() => {
            commit('setUser', JSON.parse(localStorage.getItem('user')));
        })
    },
    deleteRayado({ commit }, payload) {
        rayadoService.delete(payload.userId, payload.itemId).then(() => {
            commit('setUser', JSON.parse(localStorage.getItem('user')));
        })
    },
};

const mutations = {
    loginRequest(state, user) {
        state.status = { loggingIn: true };
        state.user = user;
    },
    loginSuccess(state, user) {
        state.status = { loggedIn: true };
        state.user = user;
    },
    loginFailure(state) {
        state.status = {};
        state.user = null;
    },
    logout(state) {
        state.status = {};
        state.user = null;
    },
    registerRequest(state) {
        state.status = { registering: true };
    },
    registerSuccess(state) {
        state.status = {};
    },
    registerFailure(state) {
        state.status = {};
    },
    setUser(state, user) {
        state.user = user;
    },
};

export const account = {
    namespaced: true,
    state,
    actions,
    mutations
};