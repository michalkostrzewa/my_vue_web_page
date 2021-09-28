<template>
  <div>
    <AppHeader />
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component"> </component>
      </transition>
    </router-view>
    <AppModal />
  </div>
</template>

<script>
import AppHeader from "@/components/Header.vue";
import AppModal from "@/components/Auth.vue";

export default {
  name: "App",
  components: {
    AppHeader,
    AppModal,
  },
  created() {
    this.$store.dispatch("init_login");
  },
};
</script>

<style>
.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: all 0.5s linear;
}
.fade-leave-to {
  transition: all 0.5s linear;
  opacity: 0;
}
</style>
