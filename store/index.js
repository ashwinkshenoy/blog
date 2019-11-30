import axios from "axios";

const initialState = {
  posts: [],
  post: [],
  categories: [],
  tags: []
};

export const state = () => initialState;

export const getters = {
  posts(state) {
    return state.posts;
  },
  post(state) {
    return state.post;
  },
  categories(state) {
    return state.categories;
  },
  tags(state) {
    return state.tags;
  }
};

export const mutations = {
  SET_POSTS(state, value) {
    state.posts = value;
  },
  SET_POST(state, value) {
    state.post = value;
  },
  SET_CATEGORIES(state, value) {
    state.categories = value;
  },
  SET_TAGS(state, value) {
    state.tags = value;
  }
};

const url = `https://truecaller.blog/wp-json/wp/v2`;

export const actions = {
  getPostsData: async ({ commit }, value = 1) => {
    try {
      const { data } = await axios.get(`${url}/posts?per_page=1&page=${value}`);
      commit("SET_POSTS", data);
    } catch (error) {
      console.log(error);
    }
  },
  getMorePosts: async ({ commit, state }, value = 1) => {
    try {
      const { data } = await axios.get(
        `${url}/posts?per_page=1&page=${value}`,
        { crossdomain: true }
      );
      commit("SET_POSTS", [...state.posts, ...data]);
    } catch (error) {
      console.log(error);
    }
  },
  getSinglePostData: async ({ commit }, value) => {
    try {
      const { data } = await axios.get(`${url}/posts?slug=${value}`);
      commit("SET_POST", data);
    } catch (error) {
      console.log(error);
    }
  },
  getCategories: async ({ commit }, value) => {
    try {
      const { data } = await axios.get(`${url}/categories`);
      commit("SET_CATEGORIES", data);
    } catch (error) {
      console.log(error);
    }
  },
  getTags: async ({ commit }, value) => {
    try {
      const { data } = await axios.get(`${url}/tags`);
      commit("SET_TAGS", data);
    } catch (error) {
      console.log(error);
    }
  },
  resetSinglePost({ commit }, value) {
    commit("SET_POST", []);
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
