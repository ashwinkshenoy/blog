<template>
  <div class="true-loader">
    <img src="@/assets/images/rm-loader.svg" alt="app-icon-loader" />
    <span>Loading blog content...</span>
  </div>
</template>

<script>
export default {
  name: "Loader"
};
</script>

<style lang="scss">
.true-loader {
  animation-name: pulse;
  animation-duration: 1s;
  animation-fill-mode: both;
  animation-iteration-count: infinite;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 80px 0;

  img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    margin-right: 10px;
  }

  @keyframes pulse {
    from {
      -webkit-transform: scale3d(1, 1, 1);
      transform: scale3d(1, 1, 1);
    }

    50% {
      -webkit-transform: scale3d(1.05, 1.05, 1.05);
      transform: scale3d(1.05, 1.05, 1.05);
    }

    to {
      -webkit-transform: scale3d(1, 1, 1);
      transform: scale3d(1, 1, 1);
    }
  }
}
</style>
