import { createStore } from 'vuex';

export default createStore({
  state: {
    user: null,
    isSuperAdmin: false,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      state.isSuperAdmin = user && user.role === 'super_admin';
    },
    clearUser(state) {
      state.user = null;
      state.isSuperAdmin = false;
    },
  },
  actions: {
    setUser({ commit }, user) {
      commit('setUser', user);
    },
    clearUser({ commit }) {
      commit('clearUser');
    },
  },
  getters: {
    getUser: (state) => state.user,
    isSuperAdmin: (state) => state.isSuperAdmin,
  },
});
