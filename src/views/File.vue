<template>
  <main>
    <!-- Music Header -->
    <section class="w-full mb-8 py-24 text-center text-white relative min-height">
      <div
        class="absolute inset-0 w-full h-full box-border bg-contain introduction-bg"
        style="background-image: url(/assets/img/file-header.png)"
      ></div>
      <div class="container mx-auto">
        <div class="text-white main-header-content">
          <!-- file Info -->
          <div class="text-4xl font-bold">{{ file.modified_name }}</div>
        </div>
      </div>
    </section>
    <!-- Form -->
    <section class="container mx-auto mt-6">
      <div class="bg-white rounded border border-gray-200 relative flex flex-col">
        <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
          <!-- Comment Count -->
          <span class="card-title">Comments ({{ file.comment_count }})</span>
          <i class="fa fa-comments float-right text-blue-400 text-2xl"></i>
        </div>
        <div class="p-6">
          <div
            class="text-white text-center font-bold p-4 mb-4"
            v-if="comment_show_alert"
            :class="comment_alert_variant"
          >
            {{ comment_alert_message }}
          </div>
          <vee-form :validation-schema="schema" @submit="addComment" v-if="userLoggedIn">
            <vee-field
              as="textarea"
              name="comment"
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
                mb-4
              "
              placeholder="Your comment here..."
            ></vee-field>
            <ErrorMessage class="text-red-600" name="comment" />
            <button
              type="submit"
              class="py-1.5 px-3 rounded text-white bg-blue-600 block"
              :disabled="comment_in_submission"
            >
              Submit
            </button>
          </vee-form>
          <!-- Sort Comments -->
          <select
            v-model="sort"
            class="
              block
              mt-4
              py-1.5
              px-3
              text-gray-800
              border border-gray-300
              transition
              duration-500
              focus:outline-none focus:border-black
              rounded
            "
          >
            <option value="Latest">Latest</option>
            <option value="Oldest">Oldest</option>
          </select>
        </div>
      </div>
    </section>
    <!-- Comments -->
    <ul class="container mx-auto" id="comments">
      <li class="p-6 bg-gray-50 border border-gray-200" v-for="comment in sortedComments" :key="comment.docID">
        <div class="mb-5">
          <div class="font-bold">{{ comment.name }}</div>
          <time>{{ comment.datePostet }}</time>
        </div>
        <p>{{ comment.content }}</p>
      </li>
    </ul>
  </main>
</template>

<script>
import { auth, filesCollection, commentsCollection } from "@/includes/firebase";
import { mapState } from "vuex";

export default {
  name: "File",
  data() {
    return {
      file: {},
      schema: { comment: "required" },
      comment_in_submission: false,
      comment_show_alert: false,
      comment_alert_variant: "bg-blue-500",
      comment_alert_message: "Please wait! Your comment is veing submited",
      comments: [],
      sort: "Latest",
    };
  },
  computed: {
    ...mapState(["userLoggedIn"]),
    sortedComments() {
      return this.comments.slice().sort((a, b) => {
        if (this.sort === "Latest") {
          return new Date(b.datePostet) - new Date(a.datePostet);
        }
        return new Date(a.datePostet) - new Date(b.datePostet);
      });
    },
  },
  async created() {
    const docSnapshot = await filesCollection.doc(this.$route.params.id).get();

    if (!docSnapshot.exists) {
      this.$router.push({ name: "home" });
      return;
    }

    const { sort } = this.$route.query;

    this.sort = sort === "Latest" || sort === "Oldest" ? sort : "Latest";

    this.file = docSnapshot.data();
    this.getComments();
  },
  methods: {
    async addComment(values, { resetForm }) {
      this.comment_in_submission = true;
      this.comment_show_alert = true;
      this.comment_alert_variant = "bg-blue-500";
      this.comment_alert_message = "Please wait! Your comment is veing submited";
      const comment = {
        content: values.comment,
        datePostet: new Date().toString(),
        fileID: this.$route.params.id,
        name: auth.currentUser.displayName,
        uid: auth.currentUser.uid,
      };

      await commentsCollection.add(comment);

      this.file.comment_count += 1;
      await filesCollection.doc(this.$route.params.id).update({ comment_count: this.file.comment_count });

      this.getComments();

      this.comment_in_submission = false;
      this.comment_alert_variant = "bg-green-500";
      this.comment_alert_message = "Comment  added!";

      resetForm();
    },
    async getComments() {
      console.log(auth.currentUser);
      const snapshot = await commentsCollection.where("fileID", "==", this.$route.params.id).get();
      this.comments = [];

      snapshot.forEach((element) => {
        this.comments.push({
          docID: element.id,
          ...element.data(),
        });
      });
    },
  },
  watch: {
    sort(newVal) {
      if (newVal === this.$route.query.sort) {
        return;
      }
      this.$router.push({
        query: {
          sort: newVal,
        },
      });
    },
  },
};
</script>

<style scoped>
.min-height {
  min-height: 400px;
}
</style>
