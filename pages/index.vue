<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-8">
        <nuxt-child></nuxt-child>
      </div>
      <div class="col-12 col-md-3 offset-md-1">
        <!-- Categories -->
        <div class="true-cat-tags">
          <h2>Categories</h2>
          <div
            class="true-category"
            v-for="(category, index) in categories"
            :key="`category-${index}`"
          >
            <p @click="getPostsByCategory(category.id)">{{ category.name }}</p>
          </div>
        </div>

        <!-- Tags -->
        <div class="true-cat-tags">
          <h2>Tags</h2>
          <div
            class="true-tag"
            v-for="(tag, index) in tags"
            :key="`tag-${index}`"
          >
            <p @click="getPostsByTag(tag.id)">{{ tag.name }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Related Posts -->
    <related-posts v-if="post && post.length > 0" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import RelatedPosts from "~/components/relatedPosts.vue";

export default {
  components: {
    RelatedPosts
  },

  computed: {
    ...mapGetters(["categories", "tags", "post"])
  },

  created() {
    this.getCategories();
    this.getTags();
  },

  methods: {
    ...mapActions(["getCategories", "getTags", "getPostsData", "resetPosts"]),

    getPostsByTag(tagId) {
      this.resetPosts();
      this.getPostsData({ tagId });
      this.$router.push({ path: "/" });
    },

    getPostsByCategory(categoryId) {
      this.resetPosts();
      this.getPostsData({ categoryId });
      this.$router.push({ path: "/" });
    }
  }
};
</script>

<style lang="scss">
$el: ".true-cat-tags";

#{$el} {
  h2 {
    font-weight: 600;
    margin: 50px 0 20px;
    font-size: 24px;
    // text-transform: uppercase;
  }
  p {
    cursor: pointer;
  }
}
</style>
