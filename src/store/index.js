import { createStore } from "vuex";

export default createStore({
  state: {
    apiUrl: "https://news-about-it.000webhostapp.com/api/v1",
    auth: null,
    token: null,
  },
  getters: {
    getUrl: (state) => (uri) => state.apiUrl + uri,
  },
  mutations: {},
  actions: {
    setAuth({ state }, auth) {
      return (state.auth = auth);
    },
    setToken({ state }, token) {
      return (state.token = token);
    },
    logout({ state }) {
      state.auth = null;
      state.token = null;
    },
  },
  modules: {},
});
