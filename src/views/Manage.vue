<template>
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <app-upload :addFile="addFile" />
      <div class="col-span-2">
        <div class="bg-white rounded border border-gray-200 relative flex flex-col">
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">My Files</span>
            <i class="fa fa-folder-open float-right text-blue-400 text-2xl"></i>
          </div>
          <div class="p-6">
            <composition-item
              v-for="(file, i) in files"
              :key="file.docID"
              :file="file"
              :updateFile="updateFile"
              :index="i"
              :removeFile="removeFile"
              :updateUnsavedFlag="updateUnsavedFlag"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AppUpload from "@/components/Upload.vue";
import CompositionItem from "@/components/CompositionItem.vue";
import { filesCollection, auth } from "@/includes/firebase";

export default {
  name: "Manage",
  components: {
    AppUpload,
    CompositionItem,
  },
  data() {
    return {
      files: [],
      unsavedFlag: false,
    };
  },
  async created() {
    const snapshot = await filesCollection.where("uid", "==", auth.currentUser.uid).get();
    snapshot.forEach(this.addFile);
  },
  methods: {
    updateFile(i, values) {
      this.files[i].modified_name = values.modified_name;
    },
    removeFile(i) {
      this.files.splice(i, 1);
    },
    addFile(element) {
      const file = {
        ...element.data(),
        docID: element.id,
      };
      this.files.push(file);
    },
    updateUnsavedFlag(value) {
      console.log(value);
      this.unsavedFlag = value;
    },
  },
  beforeRouteLeave(to, form, next) {
    if (!this.unsavedFlag) {
      next();
    } else {
      const leave = confirm("You have unsaved changes. Are you sure you want to leave?");
      next(leave);
    }
  },
};
</script>
