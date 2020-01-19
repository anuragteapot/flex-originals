import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import mutations from './mutations';
import getters from './getters';
import actions from './actions';
import createPersistedState from 'vuex-persistedstate';
import { persistedStateOptions } from './plugins/persistedstate';

Vue.use(Vuex);

export default function createStore() {
  return new Vuex.Store({
    state,
    actions,
    mutations,
    getters,
    plugins: [createPersistedState(persistedStateOptions)],
  });
}
