<template>
  <div>
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
import { mapGetters } from "vuex";

export default {
  name: "RelatedPosts",

  computed: {
    ...mapGetters(["post"])
  }
};
</script>

<style lang="scss">
$el: ".true-post-related";

#{$el} {
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
