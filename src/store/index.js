import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

class FakeServer {
  constructor() {
    if(!window.localStorage['it-projects-todo']) {
      this.createDb();
    }
    this.state = JSON.parse(window.localStorage['it-projects-todo']);
  }
  getState() {    
    return JSON.parse(window.localStorage['it-projects-todo']);
  }
  saveState(payload) {
    window.localStorage['it-projects-todo'] = JSON.stringify(payload);
  }
  createDb() {
    this.saveState({lastId:0, cards: {}});
  }
}
const server = new FakeServer();

export default new Vuex.Store({
  // it's not a real server so I'm going to get evetything and work with it here
  state: server.getState(),
  getters: {
    getCardById: state => id => {
      return state.cards[+id];
    }
  },
  mutations: {
    saveCard(state, payload) {
      state.cards[payload.id.toString()] = payload.data;    
    },
    addCard(state) {
      const id = state.lastId + 1;
      state.cards[id.toString()] = {title: 'New card', tasks: []};
      state.lastId++;
    },
    deleteCard(state, id) {
      Vue.delete(state.cards, id.toString()); 
    }
  },
  // no async without server and weird operations order (:
  actions: {
    saveCard(context, payload) {
      context.commit('saveCard', payload);
      server.saveState(context.state);
    },
    addCard(context) {
      context.commit('addCard');
      server.saveState(context.state);
      return context.state.lastId;
    },
    deleteCard(context, id) {
      context.commit('deleteCard', id);
      server.saveState(context.state);
    }
  },
  modules: {
  }
})
