<template>
  <div>
    <loader v-show="posts && posts.length === 0" />
    <post :posts="posts" />
  </div>
</template>

<script>
import { format, render, cancel, register } from "timeago.js";
import { mapGetters, mapActions } from "vuex";
import Loader from "~/components/loader.vue";
import Post from "~/components/post.vue";

export default {
  name: "Category",
  scrollToTop: true,

  components: {
    Loader,
    Post
  },

  computed: {
    ...mapGetters(["posts", "page"])
  },

  created() {
    this.getByType(this.$route.params.type);
  },

  methods: {
    ...mapActions(["getPostsData", "getCategories", "getTags"]),

    getDate(date) {
      return format(date, "en_US");
    },

    getByType(type) {
      if (type === "category") {
        this.getCategories({ categorySlug: this.$route.params.name });
      } else if (type === "tag") {
        this.getTags({ tagSlug: this.$route.params.name });
      }
    },

    setPageTitle() {
      const { name, type } = this.$route.params;
      return `${name
        .replace(/-/g, " ")
        .split(" ")
        .map(s => s.charAt(0).toUpperCase() + s.substring(1))
        .join(" ")} | ${type.charAt(0).toUpperCase() + type.slice(1)}`;
    }
  },

  watch: {
    $route({ params, query }) {
      this.getByType(params.type);
    }
  },

  head() {
    return {
      title: `${this.setPageTitle()} | Truecaller`
    };
  }
};
</script>
