import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      loggedIn: localStorage.getItem('loginInfo') != null ? true : false,
      role: localStorage.getItem('loginInfo') != null ? JSON.parse(localStorage.getItem('loginInfo')).role : -1
    }
  },

  getters: {
    auth(state) {
      return state.user
    }
  },
  mutations: {
    setLoggedMark (state){
      state.user.loggedIn = true;
      state.user.role = JSON.parse(localStorage.getItem('loginInfo')).role;
    },
    removeLoggedMark (state){
      state.user.loggedIn = false;
      state.user.role = -1;
    }
  },
  actions: {
    setLoggedInfo ({ commit }, payload) {
      localStorage.setItem('loginInfo', JSON.stringify(payload));
      commit('setLoggedMark');
    },
    signOut ({ commit }) {
      localStorage.removeItem('loginInfo');
      commit('removeLoggedMark');
    }
  },
  modules: {

  }
})
