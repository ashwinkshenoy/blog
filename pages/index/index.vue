<template>
  <div>
    <loader v-show="posts && posts.length === 0" />
    <post :posts="posts" />

    <div class="text-center" v-show="posts && posts.length > 0">
      <loader v-if="loadingPosts" />
      <button @click="loadMorePosts()" class="true-post__button" v-else>Load More</button>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";
  import Loader from "~/components/loader.vue";
  import Post from "~/components/post.vue";

  export default {
    data() {
      return {
        count: 1,
        loadingPosts: false
      };
    },

    components: {
      Loader,
      Post
    },

    computed: {
      ...mapGetters(["posts", "page"])
    },

    async fetch({ store, route }) {
      if (route.query.page) {
        if (parseInt(route.query.page) !== this.page) {
          await store.dispatch("getMorePosts", route.query.page);
        }
      } else {
        await store.dispatch("getPostsData");
      }
    },

    methods: {
      ...mapActions(["getPostsData", "getMorePosts"]),

      async loadMorePosts() {
        this.loadingPosts = true;
        this.count += 1;
        this.$router.push({ query: { page: this.count } });
        await this.getMorePosts(this.count);
        this.loadingPosts = false;
      }
    },

    head() {
      return {
        title: "Rentomojo Blog"
      };
    }
  };
</script>
