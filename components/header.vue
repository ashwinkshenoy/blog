<template>
  <div class="true-header">
    <n-link to="/">
      <img src="@/assets/images/logo.svg" alt="header-logo" />
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
  background: #0086fe;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}
</style>
