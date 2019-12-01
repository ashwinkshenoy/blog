<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-8">
        <nuxt-child></nuxt-child>
        <!-- Related Posts -->
        <related-posts
          v-if="post && post.length > 0"
          class="d-md-none d-lg-none"
        />
      </div>
      <div class="col-12 col-md-3 offset-md-1">
        <!-- Categories -->
        <div class="true-cat-tags" v-show="categories && categories.length > 0">
          <h2>Categories</h2>
          <div
            class="true-category"
            v-for="(category, index) in categories"
            :key="`category-${index}`"
          >
            <p
              @click="getPostsByCategory(category.slug)"
              :class="[{ 'is-active': typeName === category.slug }]"
            >
              {{ category.name }}
            </p>
          </div>
        </div>

        <!-- Tags -->
        <div class="true-cat-tags" v-show="tags && tags.length > 0">
          <h2>Tags</h2>
          <div
            class="true-tag"
            v-for="(tag, index) in tags"
            :key="`tag-${index}`"
          >
            <p
              @click="getPostsByTag(tag.slug)"
              :class="[{ 'is-active': typeName === tag.slug }]"
            >
              {{ tag.name }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Related Posts -->
    <related-posts v-if="post && post.length > 0" class="d-none d-md-block" />
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
    ...mapGetters(["categories", "tags", "post"]),

    typeName() {
      return this.$route.params.name;
    }
  },

  created() {
    this.getCategories();
    this.getTags();
  },

  methods: {
    ...mapActions(["getCategories", "getTags", "getPostsData", "resetPosts"]),

    getPostsByTag(tagSlug) {
      this.$router.push({ path: `/tag/${tagSlug}` });
    },

    getPostsByCategory(categorySlug) {
      this.$router.push({ path: `/category/${categorySlug}` });
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
    position: relative;
    transition: 0.2s all linear;
    &.is-active {
      border-left: solid 3px #0086fe;
      padding-left: 10px;
    }
  }
}
</style>
