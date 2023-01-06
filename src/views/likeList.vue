<template>
  <div class="error">
    <img src="@/assets/404.png" alt="">
    <h1>
      This page doesn't exist yet:(<br>
      come back later
    </h1>
  </div>
</template>

<script>
export default {
  name: "likeList"
}
</script>

<style scoped>

.error{
  display: grid;
  place-items: center;
}

h1{
  color: #6A6A6A;
  text-align: center;
}

</style>