<template>
  <div>
    <div
      v-for="(post, index) in posts"
      :key="`post-${index}`"
      class="true-post"
    >
      <n-link :to="`/post/${post.slug}`">
        <img
          :src="post.jetpack_featured_media_url"
          :alt="post.slug"
          class="true-post__img"
        />
        <h1 v-html="post.title.rendered" class="true-post__title"></h1>
        <span v-html="getDate(post.date)" class="true-post__date"></span>
        <p v-html="post.excerpt.rendered" class="true-post__desc"></p>
        <p class="true-post__link">Continue reading</p>
      </n-link>
    </div>

    <div class="text-center">
      <button @click="loadMorePosts()" class="true-post__button">
        Load More
      </button>
    </div>
  </div>
</template>

<script>
import { format, render, cancel, register } from "timeago.js";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      count: 1
    };
  },

  computed: {
    ...mapGetters(["posts", "page"])
  },

  created() {
    if (this.$route.query.page) {
      if (parseInt(this.$route.query.page) !== this.page) {
        this.getMorePosts(this.$route.query.page);
      }
    } else {
      this.getPostsData();
    }
  },

  methods: {
    ...mapActions(["getPostsData", "getMorePosts"]),

    getDate(date) {
      return format(date, "en_US");
    },

    loadMorePosts() {
      this.count += 1;
      this.$router.push({ query: { page: this.count } });
      this.getMorePosts(this.count);
    }
  },

  head() {
    return {
      title: "Truecaller Blog"
    };
  }
};
</script>

<style lang="scss">
$el: ".true-post";

#{$el} {
  margin: 50px 0 80px;
  &__img {
    width: 100%;
    border-radius: 10px;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
      0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  }
  &__title {
    font-weight: 600;
    margin: 30px 0 10px;
    font-size: 34px;
    text-transform: uppercase;
  }
  &__date {
    font-size: 14px;
    font-weight: 300;
  }
  &__desc {
    font-size: 18px;
    font-weight: 400;
    margin-top: 10px;
  }
  &__link {
    color: #007dcc;
    font-size: 15px;
    font-weight: 300;
  }
  &__button {
    background: #0087ff;
    border: 0;
    margin: 20px 0 50px;
    padding: 10px 20px;
    color: white;
    border-radius: 3px;
    outline: none !important;
  }
}
</style>
