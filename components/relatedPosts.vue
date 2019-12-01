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
        <div
          target="_blank"
          rel="noreferrer noopener"
          class="true-post-related__content col-6 col-md-3"
          v-for="(related, index) in post['jetpack-related-posts'].slice(0, 4)"
          :key="`post-content-${index}`"
          @click="getRelatedPost(related.id)"
          :aria-label="related.title"
        >
          <img
            :src="related.img.src"
            :alt="related.alt_text"
            class="true-post-related__img"
          />
          <h3 v-html="related.title"></h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "RelatedPosts",

  computed: {
    ...mapGetters(["post"])
  },

  methods: {
    ...mapActions(["getSinglePostData"]),

    async getRelatedPost(postId) {
      const data = await this.getSinglePostData({ postId: postId });
      this.$router.push({ path: `/article/${data[0].slug}` });
    }
  }
};
</script>

<style lang="scss">
$el: ".true-post-related";

#{$el} {
  margin: 60px 0 50px;
  cursor: pointer;
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
