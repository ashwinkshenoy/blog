<template>
  <div>
    <loader v-show="post && post.length === 0" />
    <!-- Main Post Content -->
    <div
      class="true-post-content"
      v-for="(post, index) in post"
      :key="`post-content-${index}`"
    >
      <img
        v-lazy="post.jetpack_featured_media_url"
        :alt="post.slug"
        class="true-post-content__img"
      />
      <h1
        v-html="getPostTitle(post.title.rendered)"
        class="true-post-content__title"
      ></h1>

      <div class="true-post-content__author">
        <img
          :src="
            post._embedded.author && post._embedded.author[0].avatar_urls['96']
          "
          :alt="post._embedded.author && post._embedded.author[0].name"
          class="true-post-content__author-img"
        />
        <span class="true-post-content__author-name">
          by
          <strong>{{
            post._embedded.author && post._embedded.author[0].name
          }}</strong>
          -
        </span>
        <span
          v-html="getDate(post.date)"
          class="true-post-content__date"
        ></span>
      </div>
      <p v-html="post.content.rendered" class="true-post-content__data"></p>
    </div>
  </div>
</template>

<script>
import { format, render, cancel, register } from "timeago.js";
import { mapGetters, mapActions } from "vuex";
import Loader from "~/components/loader.vue";

export default {
  name: "Post",
  scrollToTop: true,

  data() {
    return {
      title: "Truecaller"
    };
  },

  components: {
    Loader
  },

  computed: {
    ...mapGetters(["post"])
  },

  created() {
    this.getSinglePostData(this.$route.params.id);
  },

  methods: {
    ...mapActions(["getSinglePostData", "resetSinglePost"]),

    getDate(date) {
      return format(date, "en_US");
    },

    getPostTitle(title) {
      this.title = `${title} | Truecaller Blog`;
      return title;
    }
  },

  head() {
    return {
      title: this.title
    };
  },

  beforeDestroy() {
    this.resetSinglePost();
  }
};
</script>

<style lang="scss">
$el: ".true-post-content";

#{$el} {
  margin: 50px 0 70px;
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
  &__author {
    margin: 20px 0;
  }
  &__author-img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 50px;
  }
  &__author-name {
    margin-left: 10px;
  }
  &__date {
    font-size: 14px;
    font-weight: 300;
  }
  &__data {
    font-size: 18px;
    font-weight: 400;
    margin-top: 10px;
  }
  & h2,
  & h3,
  & h4 {
    font-weight: 600;
    margin: 30px 0 10px;
    font-size: 28px;
  }
  & p {
    margin: 20px 0;
  }
  %image-alt {
    font-size: 14px;
    text-align: center;
    margin: 10px auto;
    font-style: italic;
    display: block;
  }
  & figure {
    margin: 40px 0;
    width: 100% !important;
    img {
      border-radius: 10px;
      width: 100%;
      height: auto;
    }
    figcaption {
      @extend %image-alt;
    }
  }
  .wp-block-image {
    span {
      @extend %image-alt;
    }
  }
  & iframe {
    width: 100%;
    min-height: 400px;
  }
  & ul {
    padding-left: 0;
    li {
      list-style: none;
    }
  }
}
</style>
