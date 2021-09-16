<template>
  <div>
    <AppHeader />
    <router-view></router-view>
    <AppPlayer />
    <AppModal />
  </div>
</template>

<script>
import AppHeader from "@/components/Header.vue";
import AppPlayer from "@/components/Player.vue";
import AppModal from "@/components/Auth.vue";

export default {
  name: "App",
  components: {
    AppHeader,
    AppPlayer,
    AppModal,
  },
  created() {
    this.$store.dispatch("init_login");
  },
};
</script>
