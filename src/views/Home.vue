<template>
  <main>
    <AppIntroduction />
    <AppMainContent :files="files" />
  </main>
</template>

<script>
import AppIntroduction from "@/components/Introduction.vue";
import AppMainContent from "@/components/filesPage/MainContent.vue";
import { filesCollection } from "@/includes/firebase";

export default {
  name: "Home",
  components: {
    AppIntroduction,
    AppMainContent,
  },
  data() {
    return {
      files: [],
      maxPerPage: 25,
      pendingRequest: false,
    };
  },
  created() {
    this.getFiles();
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      const { scrollTop, offsetHeight } = document.documentElement;
      const { innerHeight } = window;
      const isBottomOfWindow = Math.round(scrollTop) + innerHeight === offsetHeight;

      if (isBottomOfWindow) {
        this.getFiles();
      }
    },
    async getFiles() {
      if (this.pendingRequest) return;

      this.pendingRequest = true;

      let lastDoc = 0;
      if (this.files.length) lastDoc = await filesCollection.doc(this.files[this.files.length - 1].key).get();
      let snapshots = await filesCollection.orderBy("modified_name").startAfter(lastDoc).limit(this.maxPerPage).get();

      snapshots.forEach((element) => {
        this.files.push({ docID: element.id, ...element.data() });
      });

      this.pendingRequest = false;
    },
  },
};
</script>
