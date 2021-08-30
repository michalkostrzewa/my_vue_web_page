<template>
  <div>
    <AppHeader />
    <AppIntroduction />
    <AppMainContent />
    <AppPlayer />
    <AppModal />
  </div>
</template>

<script>
import AppHeader from "./components/Header.vue";
import AppIntroduction from "./components/Introduction.vue";
import AppMainContent from "./components/MainContent.vue";
import AppPlayer from "./components/Player.vue";
import AppModal from "./components/Auth.vue";

export default {
  name: "App",
  components: {
    AppHeader,
    AppIntroduction,
    AppMainContent,
    AppPlayer,
    AppModal,
  },
};
</script>
