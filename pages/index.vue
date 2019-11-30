<template>
  <div class="container">
    <div class="row">
      <div class="col-8">
        <nuxt-child></nuxt-child>
      </div>
      <div class="col-4 col-md-3 offset-md-1">
        <!-- Tags -->
        <div class="true-categories">
          <h2>Tags</h2>
          <div class="true-category" v-for="(tag, index) in tags" :key="`tag-${index}`">
            <p>{{ tag.name }}</p>
          </div>
        </div>
        <!-- Categories -->
        <div class="true-categories">
          <h2>Categories</h2>
          <div
            class="true-category"
            v-for="(category, index) in categories"
            :key="`category-${index}`"
          >
            <p>{{ category.name }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";

  export default {
    computed: {
      ...mapGetters(["categories", "tags"])
    },

    created() {
      // this.getCategories();
      // this.getTags();
    },

    methods: {
      ...mapActions(["getCategories", "getTags"])
    }
  };
</script>

<style lang="scss">
  $el: ".true-categories";

  #{$el} {
    h2 {
      font-weight: 600;
      margin: 50px 0 20px;
      font-size: 20px;
      text-transform: uppercase;
    }
  }
</style>
