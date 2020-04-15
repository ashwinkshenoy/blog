<template>
  <div class="true-header">
    <n-link to="/">
      <img src="https://www.rentomojo.com/public/images/logo.svg" alt="header-logo" />
    </n-link>
  </div>
</template>

<script>
  export default {
    name: "Header"
  };
</script>

<style lang="scss">
  .true-header {
    // background: #dc3226;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 10px 0 rgba(0,0,0,.16);

    img {
      width: 170px;
      // filter: grayscale(1) contrast(100) invert(1);
    }

    @media screen and (min-width: 768px) {
      padding: 15px;
      img {
        width: 170px;
      }
    }
  }
</style>
