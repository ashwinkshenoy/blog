import axios from "axios";

const initialState = {
  posts: [],
  post: [],
  categories: [],
  tags: [],
  page: 1
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
  },
  page(state) {
    return state.page;
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
  },
  SET_PAGE(state, value) {
    state.page = value;
  }
};

const url = `https://truecaller.blog/wp-json/wp/v2`;

export const actions = {
  getPostsData: async ({ commit }, value) => {
    try {
      let appendUrl = "";
      if (value && value.tagId) {
        appendUrl = `&tags[]=${value.tagId}`;
      }
      if (value && value.categoryId) {
        appendUrl = `&categories=${value.categoryId}`;
      }

      const { data } = await axios.get(
        `/posts?per_page=25&page=1&_embed${appendUrl}`,
        {
          crossdomain: true
        }
      );
      commit("SET_POSTS", data);
    } catch (error) {
      console.log(error);
    }
  },
  getMorePosts: async ({ commit, state }, value = 1) => {
    try {
      const { data } = await axios.get(
        `/posts?per_page=25&page=${value}&_embed`,
        {
          crossdomain: true
        }
      );
      commit("SET_POSTS", [...state.posts, ...data]);
      commit("SET_PAGE", value);
    } catch (error) {
      console.log(error);
    }
  },
  getSinglePostData: async ({ commit }, value) => {
    try {
      const { data } = await axios.get(`/posts?slug=${value}&_embed`);
      commit("SET_POST", data);
    } catch (error) {
      console.log(error);
    }
  },
  getCategories: async ({ commit }, value) => {
    try {
      const { data } = await axios.get(`/categories`);
      commit("SET_CATEGORIES", data);
    } catch (error) {
      console.log(error);
    }
  },
  getTags: async ({ commit }, value) => {
    try {
      const { data } = await axios.get(`/tags`);
      commit("SET_TAGS", data);
    } catch (error) {
      console.log(error);
    }
  },
  setPage({ commit }, value) {
    commit("SET_PAGE", value);
  },
  resetPosts({ commit }, value) {
    commit("SET_POSTS", []);
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
