<template>
  <div>
    <div
      v-for="(post, index) in posts"
      :key="`post-${index}`"
      class="true-post"
    >
      <div class="true-post__img-div">
        <n-link :to="`/article/${post.slug}`">
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
        </n-link>
      </div>
      <h1 class="true-post__title">
        <n-link
          :to="`/article/${post.slug}`"
          v-html="post.title.rendered"
        ></n-link>
      </h1>
      <span class="true-post__date">{{ getDate(post.date) }}</span>
      <div v-html="post.excerpt.rendered" class="true-post__desc"></div>
      <p class="true-post__link">
        <n-link :to="`/article/${post.slug}`">Continue reading</n-link>
      </p>
    </div>
  </div>
</template>

<script>
import { format, render, cancel, register } from "timeago.js";

export default {
  name: "Post",

  props: ["posts"],

  methods: {
    getDate(date) {
      return format(date, "en_US");
    }
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
      background: url("../assets/images/true-app-icon.png") no-repeat;
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
    max-height: 185px;
    object-fit: cover;
    object-position: top;
    border-radius: 10px;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
      0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
    z-index: 1;
    position: relative;
    @media screen and (min-width: 992px) {
      height: 400px;
      max-height: 400px;
      object-fit: cover;
    }
  }
  &__title {
    font-weight: 600;
    margin: 30px 0 10px;
    font-size: 24px;
    text-transform: uppercase;
    @media screen and (min-width: 768px) {
      font-size: 34px;
    }
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
  &__link a {
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
