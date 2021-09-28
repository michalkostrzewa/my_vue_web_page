<template>
  <section class="mb-8 py-24 text-white text-center relative min-height">
    <div
      class="absolute inset-0 w-full h-full bg-contain introduction-bg"
      style="background-image: url(assets/img/user-header.png)"
    ></div>
    <div class="container mx-auto">
      <div class="text-white main-header-content">
        <h1 class="font-bold text-5xl mb-5">Welcome to my website!</h1>
        <p class="w-full md:w-8/12 mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus et dolor mollis, congue augue non,
          venenatis elit. Nunc justo eros, suscipit ac aliquet imperdiet, venenatis et sapien. Duis sed magna pulvinar,
          fringilla lorem eget, ullamcorper urna.
        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Introduction",
};
</script>

<style scoped>
.min-height {
  min-height: 400px;
}
</style>
