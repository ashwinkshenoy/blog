<template>
  <div>
    <loader v-show="posts && posts.length === 0" />
    <div
      v-for="(post, index) in posts"
      :key="`post-${index}`"
      class="true-post"
    >
      <n-link :to="`/post/${post.slug}`">
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

    <div class="text-center" v-show="posts && posts.length > 0">
      <button @click="loadMorePosts()" class="true-post__button">
        Load More
      </button>
    </div>
  </div>
</template>

<script>
import { format, render, cancel, register } from "timeago.js";
import { mapGetters, mapActions } from "vuex";
import Loader from "~/components/loader.vue";

export default {
  data() {
    return {
      count: 1
    };
  },

  components: {
    Loader
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
  &__img-div {
    position: relative;
    &:after {
      content: "";
      position: absolute;
      background: url("../../assets/images/true-app-icon.png") no-repeat;
      width: 50px;
      height: 50px;
      background-size: cover;
      left: 50%;
      top: 50%;
      z-index: 0;
      transform: translate(-50%, -50%);
    }
  }
  &__img {
    width: 100%;
    border-radius: 10px;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
      0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
    z-index: 1;
    position: relative;
    @media screen and (min-width: 768px) {
      height: 400px;
      object-fit: cover;
    }
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
