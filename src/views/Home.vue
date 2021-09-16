<template>
  <div>
    <AppIntroduction />
    <AppMainContent />
  </div>
</template>

<script>
import AppIntroduction from "@/components/Introduction.vue";
import AppMainContent from "@/components/MainContent.vue";

export default {
  name: "Home",
  components: {
    AppIntroduction,
    AppMainContent,
  },
};
</script>

<style></style>
