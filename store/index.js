import axios from "axios";

const initialState = {
  posts: [],
  post: [],
  categories: [],
  tags: [],
  page: 1,
  related: []
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
  },
  related(state) {
    return state.related;
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
  },
  SET_RELATED(state, value) {
    state.related = value;
  }
};

const url = `https://www.rentomojo.com/blog/wp-json/wp/v2`;

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
        `${url}/posts?per_page=25&page=1${appendUrl}&_embed`,
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
        `${url}/posts?per_page=25&page=${value}&_embed`,
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

  getSinglePostData: async ({ commit, dispatch }, value) => {
    try {
      let appendUrl = "";
      if (value && value.postId) {
        appendUrl = `include=${value.postId}`;
      } else {
        appendUrl = `slug=${value}`;
      }
      const { data } = await axios.get(`${url}/posts?${appendUrl}&_embed`);
      if (value && value.postId) {
        return Promise.resolve(data);
      } else {
        commit("SET_POST", data);
        await dispatch("getRelatedPosts", {tags: data[0].tags, current: data[0].id});
      }
    } catch (error) {
      console.log(error);
    }
  },

  getRelatedPosts: async ({ commit }, value) => {
    try {
      let { data } = await axios.get(`${url}/posts?tags=${value.tags}`);
      data = data.filter((el) => el.id != value.current);
      commit("SET_RELATED", data);
    } catch (error) {
      console.log(error);
    }
  },

  getCategories: async ({ commit, dispatch }, value) => {
    try {
      let appendUrl = "";
      if (value && value.categorySlug) {
        appendUrl = `?slug=${value.categorySlug}`;
      }
      const { data } = await axios.get(`${url}/categories${appendUrl}`);
      if (value && value.categorySlug) {
        dispatch("resetPosts");
        await dispatch("getPostsData", { categoryId: data[0].id });
        return Promise.resolve(data);
      } else {
        commit("SET_CATEGORIES", data);
      }
    } catch (error) {
      console.log(error);
    }
  },

  getTags: async ({ commit, dispatch }, value) => {
    try {
      let appendUrl = "";
      if (value && value.tagSlug) {
        appendUrl = `?slug=${value.tagSlug}`;
      }
      const { data } = await axios.get(`${url}/tags${appendUrl}`);
      if (value && value.tagSlug) {
        dispatch("resetPosts");
        await dispatch("getPostsData", { tagId: data[0].id });
      } else {
        commit("SET_TAGS", data);
      }
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
