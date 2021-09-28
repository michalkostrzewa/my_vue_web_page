<template>
  <li class="flex justify-between items-center p-3 pl-6 cursor-pointer transition duration-300 hover:bg-gray-50">
    <div>
      <router-link :to="{ name: 'file', params: { id: file.docID } }" class="font-bold block text-gray-600">{{
        file.modified_name
      }}</router-link>
      <span class="text-gray-500 text-sm">{{ file.dispay_name }}</span>
    </div>

    <div class="text-gray-600 text-lg">
      <router-link custom :to="{ name: 'file', params: { id: file.docID }, hash: '#comments' }" v-slot="{ navigate }">
        <span class="comments" @click="navigate">
          <i class="fa fa-comments text-gray-600"></i>
          {{ file.comment_count }}
        </span>
      </router-link>
    </div>
  </li>
</template>

<script>
export default {
  name: "FileItem",
  props: {
    file: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style></style>
