<template>
  <div class="border border-gray-200 p-3 mb-4 rounded">
    <div v-show="!showForm">
      <h4 class="inline-block text-2xl font-bold">{{ file.modified_name }}</h4>
      <button class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right" @click.prevent="deleteFile">
        <i class="fa fa-times"></i>
      </button>
      <button
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right"
        @click.prevent="showForm = !showForm"
      >
        <i class="fa fa-pencil-alt"></i>
      </button>
    </div>
    <div v-show="showForm">
      <div class="text-white text-center font-bold p-4 mb-4" v-if="show_alert" :class="alert_variant">
        {{ alert_message }}
      </div>
      <vee-form :validation-schema="schema" :initial-values="file" @submit="edit">
        <div class="mb-3">
          <label class="inline-block mb-2">File Title</label>
          <vee-field
            name="modified_name"
            type="text"
            class="
              block
              w-full
              py-1.5
              px-3
              text-gray-800
              border border-gray-300
              transition
              duration-500
              focus:outline-none focus:border-black
              rounded
            "
            placeholder="Enter File Title"
            @input="updateUnsavedFlag(true)"
          />
          <ErrorMessage class="text-red-600" name="modified_name" />
        </div>
        <button type="submit" class="py-1.5 px-3 rounded text-white bg-blue-600" :disabled="in_submission">
          Submit
        </button>
        <button
          type="button"
          class="py-1.5 px-3 rounded text-white bg-gray-600"
          :disabled="in_submission"
          @click.prevent="showForm = false"
        >
          Go Back
        </button>
      </vee-form>
    </div>
  </div>
</template>

<script>
import { filesCollection, storage } from "@/includes/firebase";

export default {
  name: "CompositionItem",
  props: {
    file: {
      type: Object,
      required: true,
    },
    updateFile: {
      type: Function,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    removeFile: {
      type: Function,
      required: true,
    },
    updateUnsavedFlag: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      showForm: false,
      schema: {
        modified_name: "required",
      },
      in_submission: false,
      show_alert: false,
      alert_variant: "bg-blue-500",
      alert_message: "Please wait!",
    };
  },
  methods: {
    async edit(values) {
      this.in_submission = true;
      this.show_alert = true;
      this.alert_variant = "bg-blue-500";
      this.alert_message = "Please wait!";

      try {
        await filesCollection.doc(this.file.docID).update(values);
      } catch (error) {
        this.in_submission = false;
        this.alert_variant = "bg-red-500";
        this.alert_message = "Something went wrong! try again later.";
        return;
      }

      this.updateFile(this.index, values);
      this.updateUnsavedFlag(false);

      this.in_submission = false;
      this.alert_variant = "bg-green-500";
      this.alert_message = "Success!";
    },
    async deleteFile() {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(`files/${this.file.original_name}`);

      await fileRef.delete();

      await filesCollection.doc(this.file.docID).delete();

      this.removeFile(this.index);
    },
  },
};
</script>
