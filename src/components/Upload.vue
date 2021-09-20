<template>
  <div class="col-span-1">
    <div class="bg-white rounded border border-gray-200 relative flex flex-col">
      <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
        <span class="card-title">Upload</span>
        <i class="fas fa-upload float-right text-blue-400 text-2xl"></i>
      </div>
      <div class="p-6">
        <!-- Upload Dropbox -->
        <div
          class="
            w-full
            px-10
            py-20
            rounded
            text-center
            cursor-pointer
            border border-dashed border-gray-400
            text-gray-400
            transition
            duration-500
            hover:text-white hover:bg-blue-300 hover:border-blue-300 hover:border-solid
          "
          :class="{ 'bg-blue-300 border-blue-300 border-solid': is_dragover }"
          @drag.prevent.stop=""
          @dragstart.prevent.stop=""
          @dragend.prevent.stop="is_dragover = false"
          @dragover.prevent.stop="is_dragover = true"
          @dragenter.prevent.stop="is_dragover = true"
          @dragleave.prevent.stop="is_dragover = false"
          @drop.prevent.stop="upload($event)"
        >
          <h5>Drop your files here</h5>
        </div>
        <input type="file" multiple @change="upload($event)" />
        <hr class="my-6" />
        <!-- Progess Bars -->
        <div class="mb-4" v-for="upload in uploads" :key="upload.name">
          <div class="font-bold text-sm" :class="upload.text_class">
            <i :class="upload.icon"></i>
            {{ upload.name }}
          </div>
          <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
            <!-- Inner Progress Bar -->
            <div
              class="transition-all progress-bar"
              :class="upload.variant"
              :style="{ width: upload.current_progres + '%' }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { storage, auth, filesCollection } from "@/includes/firebase";

export default {
  name: "Upload",
  data() {
    return {
      is_dragover: false,
      uploads: [],
    };
  },
  props: {
    addFile: {
      type: Function,
      required: true,
    },
  },
  methods: {
    upload($event) {
      this.is_dragover = false;
      const files = $event.dataTransfer ? [...$event.dataTransfer.files] : [...$event.target.files];

      files.forEach((file) => {
        const storageRef = storage.ref();

        let fileRef = storageRef.child(`files/${file.name}`);
        if (file.type === "image/jpeg") fileRef = storageRef.child(`photos/${file.name}`);
        const task = fileRef.put(file);

        const uploadIndex =
          this.uploads.push({
            task,
            current_progres: 0,
            name: file.name,
            variant: "bg-blue-400",
            icon: "fas fa-spinner fa-spin",
            text_class: "",
          }) - 1;

        task.on(
          "state_changed",
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.uploads[uploadIndex].current_progres = progress;
          },
          (error) => {
            this.uploads[uploadIndex].variant = "bg-red-400";
            this.uploads[uploadIndex].icon = "fas fa-times";
            this.uploads[uploadIndex].text_class = "text-red-400";
            console.log(error);
          },
          async () => {
            const currentFile = {
              uid: auth.currentUser.uid,
              dispay_name: auth.currentUser.displayName,
              original_name: task.snapshot.ref.name,
              modified_name: task.snapshot.ref.name,
              comment_count: 0,
            };

            currentFile.url = await task.snapshot.ref.getDownloadURL();
            const fileRef = await filesCollection.add(currentFile);
            const fileSnapshot = await fileRef.get();

            this.addFile(fileSnapshot);

            this.uploads[uploadIndex].variant = "bg-green-400";
            this.uploads[uploadIndex].icon = "fas fa-check";
            this.uploads[uploadIndex].text_class = "text-green-400";
          }
        );
      });
    },
  },
  beforeUnmount() {
    this.uploads.forEach((upload) => {
      upload.task.cancel();
    });
  },
};
</script>
