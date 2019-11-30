<template>
  <div>
    <!-- Main Post Content -->
    <div
      class="true-post-content"
      v-for="(post, index) in post"
      :key="`post-content-${index}`"
    >
      <img
        :src="post.jetpack_featured_media_url"
        :alt="post.slug"
        class="true-post-content__img"
      />
      <h1
        v-html="getPostTitle(post.title.rendered)"
        class="true-post-content__title"
      ></h1>
      <span v-html="getDate(post.date)" class="true-post-content__date"></span>
      <p v-html="post.content.rendered" class="true-post-content__data"></p>
    </div>

    <hr />

    <!-- Related Posts -->
    <div class="true-post-related">
      <h2>Related Articles</h2>
      <div
        class="row"
        v-for="(post, index) in post"
        :key="`post-content-${index}`"
      >
        <a
          :href="related.url"
          target="_blank"
          rel="noreferrer noopener"
          class="true-post-related__content col"
          v-for="(related, index) in post['jetpack-related-posts'].slice(0, 4)"
          :key="`post-content-${index}`"
        >
          <img
            :src="related.img.src"
            :alt="related.alt_text"
            class="true-post-related__img"
          />
          <h3 v-html="related.title"></h3>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { format, render, cancel, register } from "timeago.js";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Post",
  scrollToTop: true,

  data() {
    return {
      title: "Truecaller"
    };
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
$elRelated: ".true-post-related";

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

#{$elRelated} {
  margin: 60px 0 50px;
  h2 {
    font-weight: 600;
    font-size: 22px;
    line-height: 1.38;
    margin-bottom: 18px;
  }
  h3 {
    font-weight: 600;
    margin: 10px 0;
    font-size: 18px;
  }
  img {
    width: 100%;
    object-fit: contain;
    border-radius: 5px;
  }
}
</style>
