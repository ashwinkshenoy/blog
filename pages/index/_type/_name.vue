<template>
  <div>
    <loader v-show="posts && posts.length === 0" />
    <div v-for="(post, index) in posts" :key="`post-${index}`" class="true-post">
      <n-link :to="`/article/${post.slug}`">
        <div class="true-post__img-div">
          <img
            v-lazy="
              post._embedded['wp:featuredmedia'] &&
                post._embedded['wp:featuredmedia'][0].source_url
            "
            :alt="
              post._embedded['wp:featuredmedia'] &&
                post._embedded['wp:featuredmedia'][0].alt_text
            "
            class="true-post__img"
          />
        </div>
        <h1 v-html="post.title.rendered" class="true-post__title"></h1>
        <span v-html="getDate(post.date)" class="true-post__date"></span>
        <p v-html="post.excerpt.rendered" class="true-post__desc"></p>
        <p class="true-post__link">Continue reading</p>
      </n-link>
    </div>
  </div>
</template>

<script>
  import { format, render, cancel, register } from "timeago.js";
  import { mapGetters, mapActions } from "vuex";
  import Loader from "~/components/loader.vue";

  export default {
    name: "Category",
    scrollToTop: true,

    components: {
      Loader
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
