<template>
  <section class="container mx-auto">
    <div class="bg-white rounded border border-gray-200 relative flex flex-col">
      <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
        <span class="card-title">Files</span>
        <i class="fa fa-file float-right text-blue-400 text-2xl"></i>
      </div>
      <!-- Playlist -->
      <ol id="playlist">
        <file-item v-for="file in files" :key="file.docID" :file="file" />
      </ol>
    </div>
  </section>
</template>

<script>
import FileItem from "@/components/filesPage/FileItem.vue";

export default {
  name: "MainContent",
  components: {
    FileItem,
  },
  props: {
    files: {
      type: Object,
      required: true,
    },
  },
};
</script>
